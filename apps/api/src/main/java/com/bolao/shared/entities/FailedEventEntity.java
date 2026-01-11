package com.bolao.shared.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "failed_events", indexes = {
    @Index(name = "idx_failed_events_status_next_retry", columnList = "status, next_retry_at"),
    @Index(name = "idx_failed_events_event_type", columnList = "event_type")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FailedEventEntity {

  public enum Status {
    PENDING,
    PROCESSING,
    RESOLVED,
    DEAD
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "event_type", nullable = false)
  private String eventType;

  @Column(name = "payload", columnDefinition = "TEXT", nullable = false)
  private String payload;

  @Column(name = "attempts")
  @Builder.Default
  private Integer attempts = 0;

  @Column(name = "max_attempts")
  @Builder.Default
  private Integer maxAttempts = 5;

  @Column(name = "last_error", columnDefinition = "TEXT")
  private String lastError;

  @Column(name = "next_retry_at")
  private LocalDateTime nextRetryAt;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  @Builder.Default
  private Status status = Status.PENDING;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @Column(name = "resolved_at")
  private LocalDateTime resolvedAt;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
    if (nextRetryAt == null) {
      nextRetryAt = LocalDateTime.now();
    }
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }

  public void incrementAttemptsWithBackoff(String error) {
    this.attempts++;
    this.lastError = error;

    if (this.attempts >= this.maxAttempts) {
      this.status = Status.DEAD;
      this.nextRetryAt = null;
    } else {
      long delayMinutes = (long) Math.pow(2, this.attempts - 1);
      this.nextRetryAt = LocalDateTime.now().plusMinutes(delayMinutes);
      this.status = Status.PENDING;
    }
  }

  public void markAsResolved() {
    this.status = Status.RESOLVED;
    this.resolvedAt = LocalDateTime.now();
    this.nextRetryAt = null;
  }
}
