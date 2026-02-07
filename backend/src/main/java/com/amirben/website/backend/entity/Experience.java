package com.amirben.website.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "experience")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String position;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "description_fr", columnDefinition = "TEXT")
    private String descriptionFr;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Column(name = "position_fr")
    private String positionFr;

    @Column(name = "position_en")
    private String positionEn;

    @Column(name = "highlights_fr", columnDefinition = "TEXT")
    private String highlightsFr;

    @Column(name = "highlights_en", columnDefinition = "TEXT")
    private String highlightsEn;

    @Column(name = "tech_stack", columnDefinition = "TEXT")
    private String techStack;

    // No-args constructor (required by JPA)
    public Experience() {
    }

    // Full constructor
    public Experience(String company, String position, LocalDate startDate, LocalDate endDate, String description, String techStack) {
        this.company = company;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.techStack = techStack;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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

    @Override
    public String toString() {
        return "Experience{" +
                "id=" + id +
                ", company='" + company + '\'' +
                ", position='" + position + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", description='" + description + '\'' +
                ", techStack='" + techStack + '\'' +
                '}';
    }
}
