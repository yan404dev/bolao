package com.bolao.shared.services;

import com.bolao.shared.entities.FailedEventEntity;
import com.bolao.shared.repositories.JpaFailedEventRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FailedEventService {

  private final JpaFailedEventRepository repository;
  private final ObjectMapper objectMapper;

  @Transactional
  public void registerFailedEvent(String eventType, Object payload, String error) {
    try {
      String payloadJson = objectMapper.writeValueAsString(payload);

      FailedEventEntity failedEvent = FailedEventEntity.builder()
          .eventType(eventType)
          .payload(payloadJson)
          .lastError(error)
          .status(FailedEventEntity.Status.PENDING)
          .nextRetryAt(LocalDateTime.now().plusMinutes(1))
          .build();

      repository.save(failedEvent);

    } catch (JsonProcessingException e) {
    }
  }

  @Transactional(readOnly = true)
  public List<FailedEventEntity> findEventsReadyForRetry() {
    return repository.findPendingEventsReadyForRetry(LocalDateTime.now());
  }

  @Transactional
  public void markAsProcessing(FailedEventEntity event) {
    event.setStatus(FailedEventEntity.Status.PROCESSING);
    repository.save(event);
  }

  @Transactional
  public void markAsResolved(FailedEventEntity event) {
    event.markAsResolved();
    repository.save(event);
  }

  @Transactional
  public void registerRetryFailure(FailedEventEntity event, String error) {
    event.incrementAttemptsWithBackoff(error);
    repository.save(event);
  }

  @Transactional(readOnly = true)
  public long countDeadEvents() {
    return repository.countByStatus(FailedEventEntity.Status.DEAD);
  }

  @Transactional(readOnly = true)
  public List<FailedEventEntity> findDeadEvents() {
    return repository.findByStatusOrderByCreatedAtDesc(FailedEventEntity.Status.DEAD);
  }

  public <T> T deserializePayload(FailedEventEntity event, Class<T> clazz) throws JsonProcessingException {
    return objectMapper.readValue(event.getPayload(), clazz);
  }
}
