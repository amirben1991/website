package com.amirben.website.backend.repository;

import com.amirben.website.backend.entity.AdminActionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AdminActionLogRepository extends JpaRepository<AdminActionLog, UUID> {
}
