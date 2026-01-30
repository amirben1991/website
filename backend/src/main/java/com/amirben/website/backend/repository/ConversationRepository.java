package com.amirben.website.backend.repository;

import com.amirben.website.backend.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {
    long countByUserId(UUID userId);
}