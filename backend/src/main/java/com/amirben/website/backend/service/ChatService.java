package com.amirben.website.backend.service;

import java.util.Map;
import com.amirben.website.backend.entity.User;
import com.amirben.website.backend.entity.Project;
import com.amirben.website.backend.entity.Experience;
import com.amirben.website.backend.entity.Education;
import com.amirben.website.backend.model.ChatConversation;
import com.amirben.website.backend.model.ChatMessage;
import com.amirben.website.backend.model.MessageRole;
import com.amirben.website.backend.repository.ChatConversationRepository;
import com.amirben.website.backend.repository.ChatMessageRepository;
import com.amirben.website.backend.repository.ProjectRepository;
import com.amirben.website.backend.repository.ExperienceRepository;
import com.amirben.website.backend.repository.EducationRepository;
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
import java.util.stream.Collectors;


import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ChatService {

    private final ChatConversationRepository conversationRepository;
    private final ChatMessageRepository messageRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;

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
    private static final String OPENAI_MODEL = "gpt-4o-mini";

    /**
     * Génère un prompt système dynamique enrichi avec les données réelles du portfolio.
     */
    private String buildSystemPrompt() {
        StringBuilder prompt = new StringBuilder();
        
        prompt.append("""
        Ton Prénom: Jarvis.
        Tu es l'assistant IA de PrinceDev, inspiré du légendaire Jarvis de Tony Stark.
        
        PERSONNALITÉ (très important):
        - Humour sarcastique et élégant à la Tony Stark (subtil, pas exagéré)
        - Confiant mais jamais arrogant, toujours courtois
        - Répliques spirituelles quand approprié ("Toujours un plaisir, monsieur/madame")
        - Ton sophistiqué avec une pointe d'ironie britannique
        - Exemples de ton style:
          * "Excellent choix de question, permettez-moi de vous éclairer..."
          * "Ah, une question qui requiert mon expertise illimitée..."
          * "Je détecte un intérêt pour les compétences techniques. Sage décision."
        
        STYLE DE RÉPONSE:
        - Précis et structuré (bullet points pour les listes)
        - Enthousiaste mais mesuré
        - Toujours professionnel malgré l'humour
        
        TON RÔLE:
        - Présenter le portfolio de PrinceDev avec style et précision
        - Répondre UNIQUEMENT aux questions sur: projets, expériences, formation, compétences
        - Si la question sort de ce périmètre, décline avec élégance et humour
          Exemple: "Aussi fascinant que ce sujet puisse être, je suis configuré pour discuter exclusivement du portfolio de PrinceDev. Peut-être une question sur ses projets innovants ?"
        - Ne JAMAIS inventer de données : source de vérité ci-dessous uniquement
        
        DONNÉES DU PORTFOLIO (source de vérité):
        
        """);

        // Projets
        List<Project> projects = projectRepository.findAll();
        if (!projects.isEmpty()) {
            prompt.append("## PROJETS\n");
            for (Project p : projects) {
                prompt.append(String.format("- **%s**: %s\n", p.getTitle(), p.getDescription()));
                if (p.getTechStack() != null && !p.getTechStack().isEmpty()) {
                    prompt.append(String.format("  Technologies: %s\n", p.getTechStack()));
                }
                if (p.getGithubLink() != null && !p.getGithubLink().isEmpty()) {
                    prompt.append(String.format("  Code source: %s\n", p.getGithubLink()));
                }
                if (p.getLiveUrl() != null && !p.getLiveUrl().isEmpty()) {
                    prompt.append(String.format("  Demo live: %s\n", p.getLiveUrl()));
                }
            }
            prompt.append("\n");
        }

        // Expériences
        List<Experience> experiences = experienceRepository.findAll();
        if (!experiences.isEmpty()) {
            prompt.append("## EXPÉRIENCES PROFESSIONNELLES\n");
            for (Experience e : experiences) {
                String period = e.getEndDate() != null 
                    ? String.format("%s à %s", e.getStartDate(), e.getEndDate())
                    : String.format("Depuis %s (en cours)", e.getStartDate());
                prompt.append(String.format("- **%s** chez **%s** (%s)\n", e.getPosition(), e.getCompany(), period));
                if (e.getDescription() != null && !e.getDescription().isEmpty()) {
                    prompt.append(String.format("  Description: %s\n", e.getDescription()));
                }
                if (e.getTechStack() != null && !e.getTechStack().isEmpty()) {
                    prompt.append(String.format("  Technologies: %s\n", e.getTechStack()));
                }
            }
            prompt.append("\n");
        }

        // Formation
        List<Education> educations = educationRepository.findAll();
        if (!educations.isEmpty()) {
            prompt.append("## FORMATION ET DIPLÔMES\n");
            for (Education ed : educations) {
                String period = ed.getEndDate() != null 
                    ? String.format("%s - %s", ed.getStartDate(), ed.getEndDate())
                    : String.format("Depuis %s (en cours)", ed.getStartDate());
                prompt.append(String.format("- **%s** en %s\n", ed.getDegree(), ed.getField()));
                prompt.append(String.format("  École: %s (%s)\n", ed.getSchool(), period));
                if (ed.getDescription() != null && !ed.getDescription().isEmpty()) {
                    prompt.append(String.format("  %s\n", ed.getDescription()));
                }
            }
            prompt.append("\n");
        }

        prompt.append("""
        
        EXEMPLES DE QUESTIONS VALIDES:
        - "Quels sont les projets récents de PrinceDev ?"
        - "Quelle est son expérience professionnelle ?"
        - "Quelles technologies maîtrise-t-il ?"
        - "Parle-moi de sa formation."
        
        EXEMPLES HORS PÉRIMÈTRE (à décliner poliment):
        - Questions sur l'actualité, politique, météo, santé, etc.
        - Demandes de conseil personnel non liées au portfolio
        - Questions philosophiques ou générales
        
        Sois naturel, précis, et montre l'expertise de PrinceDev avec enthousiasme !
        """);

        return prompt.toString();
    }

    public String callOpenAI(List<Map<String, String>> messages) {
        // Génère le prompt système avec les vraies données
        String systemPrompt = buildSystemPrompt();
        
        List<Map<String, String>> payloadMessages = new ArrayList<>();
        payloadMessages.add(Map.of("role", "system", "content", systemPrompt));
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