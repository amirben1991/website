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