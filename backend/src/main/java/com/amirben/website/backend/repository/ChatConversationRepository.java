package com.amirben.website.backend.repository;

import com.amirben.website.backend.model.ChatConversation;
import com.amirben.website.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatConversationRepository extends JpaRepository<ChatConversation, UUID> {
    
    Optional<ChatConversation> findByUser(User user);
}