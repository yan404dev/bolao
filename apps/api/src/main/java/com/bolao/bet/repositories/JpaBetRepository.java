package com.bolao.bet.repositories;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.entities.BetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JpaBetRepository extends JpaRepository<BetEntity, Long>, JpaSpecificationExecutor<BetEntity> {
  @Query("SELECT b FROM BetEntity b WHERE b.roundId = :roundId " +
      "AND (:search IS NULL OR LOWER(b.name) LIKE LOWER(CAST(CONCAT('%', :search, '%') AS string)) " +
      "OR LOWER(b.ticketCode) LIKE LOWER(CAST(CONCAT('%', :search, '%') AS string))) " +
      "AND (:minPoints IS NULL OR COALESCE(b.points, 0) >= :minPoints) " +
      "AND b.status = 'PAID'")
  Page<BetEntity> findByRoundIdWithFilters(
      @Param("roundId") Long roundId,
      @Param("search") String search,
      @Param("minPoints") Integer minPoints,
      Pageable pageable);

  List<BetEntity> findByRoundIdOrderByPointsDesc(Long roundId);

  List<BetEntity> findByRoundIdAndStatus(Long roundId, Bet.PaymentStatus status);

  Optional<BetEntity> findByTicketCode(String ticketCode);

  long countByRoundId(Long roundId);
  @Query("SELECT COUNT(b) FROM BetEntity b WHERE b.roundId = :roundId AND b.status = 'PAID'")
  long countPaidByRoundId(@Param("roundId") Long roundId);

  @org.springframework.data.jpa.repository.Query("SELECT MAX(b.points) FROM BetEntity b WHERE b.roundId = :roundId")
  Integer findMaxPointsByRoundId(@org.springframework.data.repository.query.Param("roundId") Long roundId);
}
