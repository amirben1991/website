package com.amirben.website.backend.controller;

import com.amirben.website.backend.entity.User;
import com.amirben.website.backend.model.ResetPasswordToken;
import com.amirben.website.backend.repository.UserRepository;
import com.amirben.website.backend.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
public class PasswordResetController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/auth/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            String token = passwordResetService.createPasswordResetToken(email);
            // TODO: Envoyer l'email avec le lien de réinitialisation contenant le token
            System.out.println("Lien de réinitialisation : http://localhost:4200/reset-password?token=" + token);
        }
        return ResponseEntity.ok("If the email exists, a reset link has been sent.");
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        Optional<ResetPasswordToken> resetTokenOpt = passwordResetService.validatePasswordResetToken(token);
        if (resetTokenOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        String email = resetTokenOpt.get().getUserEmail();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetService.deleteToken(token);

        return ResponseEntity.ok("Password has been reset successfully.");
    }
}