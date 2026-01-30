
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.amirben.website.backend.repository.UserRepository;
import com.amirben.website.backend.repository.ConversationRepository;
import com.amirben.website.backend.repository.AdminActionLogRepository;
import com.amirben.website.backend.entity.User;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;
    private final AdminActionLogRepository adminActionLogRepository;
    private final Logger log = LoggerFactory.getLogger(AdminController.class);

    public AdminController(UserRepository userRepository,
                           ConversationRepository conversationRepository,
                           AdminActionLogRepository adminActionLogRepository) {
        this.userRepository = userRepository;
        this.conversationRepository = conversationRepository;
        this.adminActionLogRepository = adminActionLogRepository;
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
