package com.amirben.website.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret:change-this-secret-in-prod}")
    private String secret;

    private SecretKey secretKey;
    private final long JWT_EXPIRATION = 1000 * 60 * 60 * 10; // 10 heures

    @PostConstruct
    public void init() {
        System.out.println("[JwtUtil] Initializing JWT util with secret length: " + (secret != null ? secret.length() : "null"));
        if (secret == null || secret.length() < 32) {
            System.out.println("[JwtUtil] ERROR: JWT secret too short or missing!");
            throw new IllegalStateException("JWT secret must be at least 32 characters. Set jwt.secret env variable.");
        }
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        System.out.println("[JwtUtil] SecretKey initialized.");
    }

    // Extraire le username du token
    public String extractUsername(String token) {
        System.out.println("[JwtUtil] Extracting username from token: " + token);
        String username = extractClaim(token, Claims::getSubject);
        System.out.println("[JwtUtil] Username extracted: " + username);
        return username;
    }

    // Extraire la date d'expiration
    public Date extractExpiration(String token) {
        System.out.println("[JwtUtil] Extracting expiration from token.");
        Date exp = extractClaim(token, Claims::getExpiration);
        System.out.println("[JwtUtil] Expiration: " + exp);
        return exp;
    }

    // Extraire un claim spécifique
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        System.out.println("[JwtUtil] Extracting claim from token.");
        final Claims claims = extractAllClaims(token);
        T result = claimsResolver.apply(claims);
        System.out.println("[JwtUtil] Claim extracted: " + result);
        return result;
    }

    // Extraire tous les claims
    private Claims extractAllClaims(String token) {
        System.out.println("[JwtUtil] Extracting all claims from token.");
        Claims claims = Jwts.parser()
            .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        System.out.println("[JwtUtil] Claims: " + claims);
        return claims;
    }

    // Vérifier si le token est expiré
    private Boolean isTokenExpired(String token) {
        Date exp = extractExpiration(token);
        boolean expired = exp.before(new Date());
        System.out.println("[JwtUtil] Token expired? " + expired);
        return expired;
    }

    // Générer un token
    public String generateToken(String username, String role) {
        System.out.println("[JwtUtil] Generating token for username: " + username + ", role: " + role);
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        String token = createToken(claims, username);
        System.out.println("[JwtUtil] Token generated: " + token);
        return token;
    }

    // Créer le token
    private String createToken(Map<String, Object> claims, String subject) {
        System.out.println("[JwtUtil] Creating token for subject: " + subject);
        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(secretKey)
                .compact();
        System.out.println("[JwtUtil] Token created: " + token);
        return token;
    }

    // Valider le token
    public Boolean validateToken(String token, String username) {
        System.out.println("[JwtUtil] Validating token for username: " + username);
        final String extractedUsername = extractUsername(token);
        boolean valid = (extractedUsername.equals(username) && !isTokenExpired(token));
        System.out.println("[JwtUtil] Token valid? " + valid);
        return valid;
    }

    // Extraire le rôle du token
    public String extractRole(String token) {
        System.out.println("[JwtUtil] Extracting role from token.");
        Claims claims = extractAllClaims(token);
        String role = claims.get("role", String.class);
        System.out.println("[JwtUtil] Role: " + role);
        return role;
    }
}