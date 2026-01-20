package com.amirben.website.backend.controller;

import com.amirben.website.backend.dto.EducationDTO;
import com.amirben.website.backend.entity.Education;
import com.amirben.website.backend.exception.ResourceNotFoundException;
import com.amirben.website.backend.service.EducationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:4200")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping
    public List<Education> getAllEducation() {
        return educationService.getAllEducation();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable UUID id) {
        return educationService.getEducationById(id)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new ResourceNotFoundException("Education not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<Education> createEducation(@Valid @RequestBody EducationDTO educationDTO) {
        Education education = new Education();
        education.setSchool(educationDTO.getSchool());
        education.setDegree(educationDTO.getDegree());
        education.setField(educationDTO.getField());
        education.setStartDate(educationDTO.getStartDate());
        education.setEndDate(educationDTO.getEndDate());
        education.setDescription(educationDTO.getDescription());

        Education savedEducation = educationService.saveEducation(education);
        return new ResponseEntity<>(savedEducation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable UUID id, @Valid @RequestBody EducationDTO educationDTO) {
        Education education = educationService.getEducationById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Education not found with id: " + id));

        education.setSchool(educationDTO.getSchool());
        education.setDegree(educationDTO.getDegree());
        education.setField(educationDTO.getField());
        education.setStartDate(educationDTO.getStartDate());
        education.setEndDate(educationDTO.getEndDate());
        education.setDescription(educationDTO.getDescription());

        Education updatedEducation = educationService.saveEducation(education);
        return ResponseEntity.ok(updatedEducation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable UUID id) {
        if (!educationService.getEducationById(id).isPresent()) {
            throw new ResourceNotFoundException("Education not found with id: " + id);
        }
        educationService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }
}