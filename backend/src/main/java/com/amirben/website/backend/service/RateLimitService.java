package com.amirben.website.backend.service;

import com.amirben.website.backend.exception.RateLimitExceededException;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;

import java.time.Duration;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

@Service
public class RateLimitService {

    private final ConcurrentHashMap<UUID, Bucket> buckets = new ConcurrentHashMap<>();

    private Bucket createNewBucket() {
        Bandwidth limit = Bandwidth.classic(10, Refill.intervally(10, Duration.ofMinutes(1)));
        return Bucket.builder().addLimit(limit).build();
    }

    private Bucket resolveBucket(UUID userId) {
        return buckets.computeIfAbsent(userId, id -> createNewBucket());
    }

    public void consumeOrThrow(UUID userId) {
        Bucket bucket = resolveBucket(userId);
        var probe = bucket.tryConsumeAndReturnRemaining(1);
        if (!probe.isConsumed()) {
            long retryAfterSeconds = (long) Math.ceil(probe.getNanosToWaitForRefill() / 1_000_000_000.0);
            throw new RateLimitExceededException("Rate limit exceeded", retryAfterSeconds);
        }
    }
}
