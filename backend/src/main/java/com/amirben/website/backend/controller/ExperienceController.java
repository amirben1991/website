package com.amirben.website.backend.controller;

import com.amirben.website.backend.dto.ExperienceDTO;
import com.amirben.website.backend.entity.Experience;
import com.amirben.website.backend.exception.ResourceNotFoundException;
import com.amirben.website.backend.service.ExperienceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/experience")
@CrossOrigin(origins = "http://localhost:4200")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public List<Experience> getAllExperience() {
        return experienceService.getAllExperience();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable UUID id) {
        return experienceService.getExperienceById(id)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<Experience> createExperience(@Valid @RequestBody ExperienceDTO experienceDTO) {
        Experience experience = new Experience();
        experience.setCompany(experienceDTO.getCompany());
        experience.setPosition(experienceDTO.getPosition());
        experience.setStartDate(experienceDTO.getStartDate());
        experience.setEndDate(experienceDTO.getEndDate());
        experience.setDescription(experienceDTO.getDescription());
        experience.setDescriptionFr(experienceDTO.getDescriptionFr());
        experience.setDescriptionEn(experienceDTO.getDescriptionEn());
        experience.setPositionFr(experienceDTO.getPositionFr());
        experience.setPositionEn(experienceDTO.getPositionEn());
        experience.setHighlightsFr(experienceDTO.getHighlightsFr());
        experience.setHighlightsEn(experienceDTO.getHighlightsEn());
        experience.setTechStack(experienceDTO.getTechStack());

        Experience savedExperience = experienceService.saveExperience(experience);
        return new ResponseEntity<>(savedExperience, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable UUID id, @Valid @RequestBody ExperienceDTO experienceDTO) {
        Experience experience = experienceService.getExperienceById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));

        experience.setCompany(experienceDTO.getCompany());
        experience.setPosition(experienceDTO.getPosition());
        experience.setStartDate(experienceDTO.getStartDate());
        experience.setEndDate(experienceDTO.getEndDate());
        experience.setDescription(experienceDTO.getDescription());
        experience.setDescriptionFr(experienceDTO.getDescriptionFr());
        experience.setDescriptionEn(experienceDTO.getDescriptionEn());
        experience.setPositionFr(experienceDTO.getPositionFr());
        experience.setPositionEn(experienceDTO.getPositionEn());
        experience.setHighlightsFr(experienceDTO.getHighlightsFr());
        experience.setHighlightsEn(experienceDTO.getHighlightsEn());
        experience.setTechStack(experienceDTO.getTechStack());

        Experience updatedExperience = experienceService.saveExperience(experience);
        return ResponseEntity.ok(updatedExperience);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable UUID id) {
        if (!experienceService.getExperienceById(id).isPresent()) {
            throw new ResourceNotFoundException("Experience not found with id: " + id);
        }
        experienceService.deleteExperience(id);
        return ResponseEntity.noContent().build();
    }
}