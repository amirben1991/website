@PostMapping("/auth/forgot-password")
public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
    String email = request.get("email");
    // Vérifier que l'utilisateur existe (ne pas révéler l'existence)
    Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isPresent()) {
        String token = passwordResetService.createPasswordResetToken(email);
        // TODO: Envoyer l'email avec le lien de réinitialisation contenant le token
        System.out.println("Lien de réinitialisation : http://localhost:4200/reset-password?token=" + token);
    }
    // Toujours retourner le même message pour la sécurité
    return ResponseEntity.ok("If the email exists, a reset link has been sent.");
}
    
    @PostMapping("/auth/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        // Vérifier le token
        Optional<ResetPasswordToken> resetTokenOpt = passwordResetService.validatePasswordResetToken(token);
        if (resetTokenOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        // Récupérer l'utilisateur par email
        String email = resetTokenOpt.get().getUserEmail();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        // Mettre à jour le mot de passe (hashé !)
        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Supprimer le token utilisé
        passwordResetService.deleteToken(token);

        return ResponseEntity.ok("Password has been reset successfully.");
    }