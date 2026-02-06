package com.amirben.website.backend.controller;

import com.amirben.website.backend.dto.ChatRequest;
import com.amirben.website.backend.model.ChatConversation;
import com.amirben.website.backend.model.ChatMessage;
import com.amirben.website.backend.model.MessageRole;
import com.amirben.website.backend.service.ChatService;
import com.amirben.website.backend.service.RateLimitService;
import com.amirben.website.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.amirben.website.backend.repository.UserRepository;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
        private final RateLimitService rateLimitService;
    private final UserRepository userRepository;

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendMessage(
            @RequestBody ChatRequest request,
            Authentication authentication) {

        // ⚠️ Adapte cette ligne si ton principal n'est pas directement User
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Rate limiting per user
        rateLimitService.consumeOrThrow(user.getId());

        ChatConversation conversation = chatService.getOrCreateConversation(user);

        // 1) On enregistre le message user
        chatService.addMessage(conversation, MessageRole.USER, request.getMessage());

        // 2) Historique formaté pour OpenAI
        List<ChatMessage> history = chatService.getConversationHistory(conversation);
        List<Map<String, String>> formatted = chatService.formatMessagesForOpenAI(history);

        // 3) Appel OpenAI
        String aiReply = chatService.callOpenAI(formatted);

        // 4) On enregistre la réponse IA
        chatService.addMessage(conversation, MessageRole.ASSISTANT, aiReply);

        return ResponseEntity.ok(Map.of("reply", aiReply));
    }

    @GetMapping("/history")
    public ResponseEntity<List<Map<String, String>>> getHistory(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        ChatConversation conversation = chatService.getOrCreateConversation(user);
        List<ChatMessage> history = chatService.getConversationHistory(conversation);

        List<Map<String, String>> dto = history.stream()
                .map(msg -> Map.of(
                        "role", msg.getRole().toString().toLowerCase(),
                        "content", msg.getContent()
                ))
                .toList();

        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/history")
    public ResponseEntity<Map<String, String>> clearHistory(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        ChatConversation conversation = chatService.getOrCreateConversation(user);
        chatService.clearConversation(conversation);

        return ResponseEntity.ok(Map.of("message", "Historique effacé avec succès"));
    }
}