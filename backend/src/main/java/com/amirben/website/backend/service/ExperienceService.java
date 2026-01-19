package com.amirben.website.backend.service;

import com.amirben.website.backend.entity.Experience;
import com.amirben.website.backend.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public List<Experience> getAllExperience() {
        return experienceRepository.findAll();
    }

    public Optional<Experience> getExperienceById(UUID id) {
        return experienceRepository.findById(id);
    }

    public Experience saveExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    public void deleteExperience(UUID id) {
        experienceRepository.deleteById(id);
    }
}