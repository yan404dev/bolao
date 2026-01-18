package com.bolao.round.repositories;

import com.bolao.round.entities.RoundEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface JpaRoundRepository extends JpaRepository<RoundEntity, Long>, JpaSpecificationExecutor<RoundEntity> {
  Optional<RoundEntity> findByExternalRoundId(String externalRoundId);

  List<RoundEntity> findByStatus(RoundEntity.Status status);

  @org.springframework.data.jpa.repository.Query("SELECT r FROM RoundEntity r ORDER BY " +
      "CASE r.status " +
      "  WHEN 'LIVE' THEN 1 " +
      "  WHEN 'OPEN' THEN 2 " +
      "  WHEN 'CLOSED' THEN 3 " +
      "  WHEN 'CALCULATED' THEN 4 " +
      "  WHEN 'CANCELLED' THEN 5 " +
      "  ELSE 6 END ASC, r.startDate ASC")
  List<RoundEntity> findAllSorted();

  @org.springframework.data.jpa.repository.Query("SELECT r FROM RoundEntity r WHERE r.status = :status ORDER BY r.startDate ASC")
  List<RoundEntity> findByStatusSorted(RoundEntity.Status status);

  Optional<RoundEntity> findFirstByStartDateBeforeOrderByStartDateDesc(java.time.LocalDateTime date);

  Optional<RoundEntity> findFirstByExternalLeagueIdAndExternalSeasonAndStartDateGreaterThanOrderByStartDateAsc(
      Integer leagueId, Integer season, java.time.LocalDateTime startDate);
}
