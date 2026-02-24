package com.amirben.website.backend.service;

import com.amirben.website.backend.model.ResetPasswordToken;
import com.amirben.website.backend.repository.ResetPasswordTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private ResetPasswordTokenRepository tokenRepository;

    public String createPasswordResetToken(String email) {
        // Supprimer les anciens tokens pour cet email
        tokenRepository.deleteByUserEmail(email);

        String token = UUID.randomUUID().toString();
        ResetPasswordToken resetToken = new ResetPasswordToken();
        resetToken.setToken(token);
        resetToken.setUserEmail(email);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        tokenRepository.save(resetToken);
        return token;
    }

    public Optional<ResetPasswordToken> validatePasswordResetToken(String token) {
        Optional<ResetPasswordToken> resetToken = tokenRepository.findByToken(token);
        if (resetToken.isPresent() && resetToken.get().getExpiryDate().isAfter(LocalDateTime.now())) {
            return resetToken;
        }
        return Optional.empty();
    }

    public void deleteToken(String token) {
        tokenRepository.findByToken(token).ifPresent(tokenRepository::delete);
    }
}