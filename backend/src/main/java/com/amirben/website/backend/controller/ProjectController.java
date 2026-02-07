package com.amirben.website.backend.controller;

import com.amirben.website.backend.dto.ProjectDTO;
import com.amirben.website.backend.entity.Project;
import com.amirben.website.backend.exception.ResourceNotFoundException;
import com.amirben.website.backend.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable UUID id) {
        return projectService.getProjectById(id)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody ProjectDTO projectDTO) {
        Project project = new Project();
        project.setTitle(projectDTO.getTitle());
        project.setDescription(projectDTO.getDescription());
        project.setDescriptionFr(projectDTO.getDescriptionFr());
        project.setDescriptionEn(projectDTO.getDescriptionEn());
        project.setTechStack(projectDTO.getTechStack());
        project.setGithubLink(projectDTO.getGithubLink());
        project.setLiveUrl(projectDTO.getLiveUrl());
        project.setImageUrl(projectDTO.getImageUrl());
        project.setFeatured(projectDTO.isFeatured());

        Project savedProject = projectService.saveProject(project);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable UUID id, @Valid @RequestBody ProjectDTO projectDTO) {
        Project project = projectService.getProjectById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        project.setTitle(projectDTO.getTitle());
        project.setDescription(projectDTO.getDescription());
        project.setDescriptionFr(projectDTO.getDescriptionFr());
        project.setDescriptionEn(projectDTO.getDescriptionEn());
        project.setTechStack(projectDTO.getTechStack());
        project.setGithubLink(projectDTO.getGithubLink());
        project.setLiveUrl(projectDTO.getLiveUrl());
        project.setImageUrl(projectDTO.getImageUrl());
        project.setFeatured(projectDTO.isFeatured());

        Project updatedProject = projectService.saveProject(project);
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID id) {
        if (!projectService.getProjectById(id).isPresent()) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}