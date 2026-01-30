
package com.amirben.website.backend.controller;
/**
 * Change user role (ADMIN only)
 */
@PatchMapping("/users/{id}/role")
public ResponseEntity<?> changeUserRole(@PathVariable UUID id, @RequestBody Map<String, String> body) {
    User user = userRepository.findById(id).orElse(null);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
    }

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUsername = authentication != null ? authentication.getName() : null;
    if (currentUsername != null && currentUsername.equalsIgnoreCase(user.getUsername())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "You cannot change your own role"));
    }

    String newRole = body.get("role");
    if (newRole == null || (!newRole.equals("ADMIN") && !newRole.equals("USER"))) {
        return ResponseEntity.badRequest().body(Map.of("error", "Invalid role value"));
    }

    com.amirben.website.backend.entity.Role previousRole = user.getRole();
    user.setRole(com.amirben.website.backend.entity.Role.valueOf(newRole));
    userRepository.save(user);
    log.info("Admin changed role of user {} to {}", user.getUsername(), newRole);

    // Audit log
    if (currentUsername != null) {
        String details = String.format("Changed role from %s to %s", previousRole, newRole);
        adminActionLogRepository.save(new com.amirben.website.backend.entity.AdminActionLog(
                currentUsername,
                package com.amirben.website.backend.controller;

    /**
     * Change user role (ADMIN only)
     */
    @PatchMapping("/users/{id}/role")
    public ResponseEntity<?> changeUserRole(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication != null ? authentication.getName() : null;
        if (currentUsername != null && currentUsername.equalsIgnoreCase(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "You cannot change your own role"));
        }

        String newRole = body.get("role");
        if (newRole == null || (!newRole.equals("ADMIN") && !newRole.equals("USER"))) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid role value"));
        }

        com.amirben.website.backend.entity.Role previousRole = user.getRole();
        user.setRole(com.amirben.website.backend.entity.Role.valueOf(newRole));
        userRepository.save(user);
        log.info("Admin changed role of user {} to {}", user.getUsername(), newRole);

        // Audit log
        if (currentUsername != null) {
            String details = String.format("Changed role from %s to %s", previousRole, newRole);
            adminActionLogRepository.save(new com.amirben.website.backend.entity.AdminActionLog(
                    currentUsername,
                    "CHANGE_ROLE",
                    user.getUsername(),
                    details
            ));
        }

        return ResponseEntity.ok(Map.of(
                "userId", user.getId(),
                "username", user.getUsername(),
                "role", user.getRole().name()
        ));
    }
@GetMapping("/users")
public ResponseEntity<List<User>> getAllUsers() {
    // Ne retourne que les users actifs (soft delete)
    List<User> users = userRepository.findAll().stream()
            .filter(User::isActive)
            .toList();
    return ResponseEntity.ok(users);
}

/**
 * Get all admin action logs (ADMIN only)
 */
@GetMapping("/audit-logs")
public ResponseEntity<List<com.amirben.website.backend.entity.AdminActionLog>> getAllAuditLogs() {
    List<com.amirben.website.backend.entity.AdminActionLog> logs = adminActionLogRepository.findAll();
    return ResponseEntity.ok(logs);
}

/**
 * Delete a user by ID (ADMIN only)
 * Cascade delete: all associated chat conversations will be deleted automatically
 */
@DeleteMapping("/users/{id}")
public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable UUID id) {
    User user = userRepository.findById(id).orElse(null);
    if (user == null) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", "User not found");
        error.put("userId", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUsername = authentication != null ? authentication.getName() : null;

    if (currentUsername != null && currentUsername.equalsIgnoreCase(user.getUsername())) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", "You cannot delete your own account");
        error.put("userId", id);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    // Count conversations before deletion for logging/audit
    long conversationCount = conversationRepository.countByUserId(id);

    // Log deletion action
    log.info("Admin deleting user {} with {} associated conversations", id, conversationCount);

    // Soft delete: désactive le user
    user.setActive(false);
    userRepository.save(user);

    // Audit log
    if (currentUsername != null) {
        String details = String.format("Soft deleted user. Conversations deleted: %d", conversationCount);
        adminActionLogRepository.save(new com.amirben.website.backend.entity.AdminActionLog(
                currentUsername,
                "SOFT_DELETE",
                user.getUsername(),
                details
        ));
    }

    // Return deletion summary
    Map<String, Object> response = new HashMap<>();
    response.put("deleted", true);
    response.put("userId", id);
    response.put("conversationsDeleted", conversationCount);
    response.put("softDelete", true);

    return ResponseEntity.ok(response);
}
}
