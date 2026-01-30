package com.amirben.website.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "admin_action_log")
public class AdminActionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String adminUsername;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false)
    private String targetUsername;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column
    private String details;

    public AdminActionLog() {}

    public AdminActionLog(String adminUsername, String action, String targetUsername, String details) {
        this.adminUsername = adminUsername;
        this.action = action;
        this.targetUsername = targetUsername;
        this.details = details;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and setters omitted for brevity
}
