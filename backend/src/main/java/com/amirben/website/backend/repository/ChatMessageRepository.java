package com.amirben.website.backend.repository;

import com.amirben.website.backend.model.ChatMessage;
import com.amirben.website.backend.model.ChatConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    
    /**
     * Récupère tous les messages d'une conversation, triés par date croissante.
     */
    List<ChatMessage> findByConversationOrderByCreatedAtAsc(ChatConversation conversation);

    /**
     * Supprime tous les messages d'une conversation.
     */
    void deleteByConversation(ChatConversation conversation);
}