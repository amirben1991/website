package com.amirben.website.backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class ExperienceDTO {

    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Position is required")
    private String position;

    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    private String descriptionFr;
    private String descriptionEn;
    private String positionFr;
    private String positionEn;
    private String highlightsFr;
    private String highlightsEn;
    private String techStack;

    // Constructeurs
    public ExperienceDTO() {}

    public ExperienceDTO(String company, String position, LocalDate startDate, LocalDate endDate, String description, String techStack) {
        this.company = company;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.techStack = techStack;
    }

    // Getters et Setters
    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTechStack() {
        return techStack;
    }

    public void setTechStack(String techStack) {
        this.techStack = techStack;
    }

    public String getDescriptionFr() {
        return descriptionFr;
    }

    public void setDescriptionFr(String descriptionFr) {
        this.descriptionFr = descriptionFr;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }

    public String getPositionFr() {
        return positionFr;
    }

    public void setPositionFr(String positionFr) {
        this.positionFr = positionFr;
    }

    public String getPositionEn() {
        return positionEn;
    }

    public void setPositionEn(String positionEn) {
        this.positionEn = positionEn;
    }

    public String getHighlightsFr() {
        return highlightsFr;
    }

    public void setHighlightsFr(String highlightsFr) {
        this.highlightsFr = highlightsFr;
    }

    public String getHighlightsEn() {
        return highlightsEn;
    }

    public void setHighlightsEn(String highlightsEn) {
        this.highlightsEn = highlightsEn;
    }
}