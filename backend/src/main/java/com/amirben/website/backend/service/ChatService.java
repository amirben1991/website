package com.amirben.website.backend.service;

import java.util.Map;
import com.amirben.website.backend.entity.User;
import com.amirben.website.backend.model.ChatConversation;
import com.amirben.website.backend.model.ChatMessage;
import com.amirben.website.backend.model.MessageRole;
import com.amirben.website.backend.repository.ChatConversationRepository;
import com.amirben.website.backend.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ChatService {

    private final ChatConversationRepository conversationRepository;
    private final ChatMessageRepository messageRepository;

    /**
     * Récupère ou crée la conversation de l'utilisateur.
     * Logique : chaque user a une conversation unique.
     */
    public ChatConversation getOrCreateConversation(User user) {
        return conversationRepository.findByUser(user)
                .orElseGet(() -> {
                    ChatConversation newConversation = ChatConversation.builder()
                            .user(user)
                            .build();
                    return conversationRepository.save(newConversation);
                });
    }

    /**
     * Ajoute un message (user ou assistant) à la conversation.
     */
    public ChatMessage addMessage(ChatConversation conversation, MessageRole role, String content) {
        ChatMessage message = ChatMessage.builder()
                .conversation(conversation)
                .role(role)
                .content(content)
                .build();
        
        ChatMessage saved = messageRepository.save(message);
        log.info("Message saved - Role: {}, Conversation: {}", role, conversation.getId());
        return saved;
    }

    /**
     * Récupère l'historique de la conversation (tous les messages, triés).
     */
    public List<ChatMessage> getConversationHistory(ChatConversation conversation) {
        return messageRepository.findByConversationOrderByCreatedAtAsc(conversation);
    }

    /**
     * Formate les messages pour l'API OpenAI.
     * OpenAI attend : [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]
     */
    public List<Map<String, String>> formatMessagesForOpenAI(List<ChatMessage> messages) {
        return messages.stream()
                .map(msg -> Map.of(
                        "role", msg.getRole().toString().toLowerCase(),
                        "content", msg.getContent()
                ))
                .toList();
    }
}