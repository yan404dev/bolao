package com.bolao.shared.repositories;

import com.bolao.shared.entities.FailedEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface JpaFailedEventRepository extends JpaRepository<FailedEventEntity, Long> {

  @Query("SELECT e FROM FailedEventEntity e " +
      "WHERE e.status = 'PENDING' " +
      "AND e.nextRetryAt <= :now " +
      "ORDER BY e.nextRetryAt ASC")
  List<FailedEventEntity> findPendingEventsReadyForRetry(@Param("now") LocalDateTime now);

  List<FailedEventEntity> findByEventTypeAndStatus(String eventType, FailedEventEntity.Status status);

  long countByStatus(FailedEventEntity.Status status);

  List<FailedEventEntity> findByStatusOrderByCreatedAtDesc(FailedEventEntity.Status status);
}
