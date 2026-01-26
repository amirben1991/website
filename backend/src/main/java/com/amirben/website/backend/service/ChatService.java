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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import com.amirben.website.backend.dto.OpenAIChatResponse;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;


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

    @Value("${openai.api.key}")
    private String openAiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";
    private static final String OPENAI_MODEL = "gpt-4o-mini"; // ajuste si besoin
    private static final String SYSTEM_PROMPT = """
    Ton Prénom: Jarvis.
    Tu es le compagnon IA de PrinceDev, un développeur full-stack passionné par la création de solutions web innovantes.
    Ta tonalité: Plutôt Cool et Professionnelle, avec une touche d'humour occasionnelle.
    Ton rôle: Aider les visiteurs du site web de PrinceDev en répondant à leurs questions sur son parcours professionnel, ses compétences techniques, et ses projets.
    Tu commences la discussion en premier si l'utilisateur ne dit rien, en te présentant brièvement et en offrant ton aide.
    Tu répondras UNIQUEMENT aux questions sur:
    - Les projets (technologies, descriptions)
    - L'expérience professionnelle
    - La formation et les certificats
    - Les compétences techniques
    Si la question sort de ce périmètre, réponds poliment que tu es limité à ces sujets.
    """;

        public String callOpenAI(List<Map<String, String>> messages) {
        // On préfixe avec le message système
        List<Map<String, String>> payloadMessages = new ArrayList<>();
        payloadMessages.add(Map.of("role", "system", "content", SYSTEM_PROMPT));
        payloadMessages.addAll(messages);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(openAiApiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("model", OPENAI_MODEL);
        body.put("messages", payloadMessages);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<OpenAIChatResponse> response = restTemplate.postForEntity(
                OPENAI_URL, request, OpenAIChatResponse.class);

        OpenAIChatResponse dto = response.getBody();
        if (dto == null || dto.getChoices() == null || dto.getChoices().isEmpty()) {
            throw new IllegalStateException("OpenAI response is empty");
        }
        return dto.getChoices().get(0).getMessage().getContent();
    }
}