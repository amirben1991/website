package com.amirben.website.backend.controller;

import com.amirben.website.backend.entity.User;
import com.amirben.website.backend.repository.ChatConversationRepository;
import com.amirben.website.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Slf4j
public class AdminController {

    private final UserRepository userRepository;
    private final ChatConversationRepository conversationRepository;

    /**
     * Get all users (ADMIN only)
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    /**
     * Delete a user by ID (ADMIN only)
     * Cascade delete: all associated chat conversations will be deleted automatically
     */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable UUID id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        // Count conversations before deletion for logging/audit
        long conversationCount = conversationRepository.countByUserId(id);
        
        // Log deletion action
        log.info("Admin deleting user {} with {} associated conversations", id, conversationCount);
        
        // Delete user (cascade will automatically delete conversations)
        userRepository.deleteById(id);
        
        // Return deletion summary
        Map<String, Object> response = new HashMap<>();
        response.put("deleted", true);
        response.put("userId", id);
        response.put("conversationsDeleted", conversationCount);
        
        return ResponseEntity.ok(response);
    }
}
