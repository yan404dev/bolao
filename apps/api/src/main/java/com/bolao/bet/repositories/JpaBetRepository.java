package com.bolao.bet.repositories;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.entities.BetEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JpaBetRepository extends JpaRepository<BetEntity, Long>, JpaSpecificationExecutor<BetEntity> {
  List<BetEntity> findByRoundId(Long roundId);

  List<BetEntity> findByRoundIdAndStatus(Long roundId, Bet.PaymentStatus status);

  Optional<BetEntity> findByTicketCode(String ticketCode);

  @Query("SELECT b FROM BetEntity b WHERE b.roundId = :roundId " +
      "AND (:search IS NULL OR :search = '' OR LOWER(CAST(b.name AS string)) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%'))) "
      +
      "AND (:minPoints IS NULL OR b.points >= :minPoints)")
  Page<BetEntity> findByRoundIdWithFilters(@Param("roundId") Long roundId,
      @Param("search") String search,
      @Param("minPoints") Integer minPoints,
      Pageable pageable);

  @Query("SELECT MAX(b.points) FROM BetEntity b WHERE b.roundId = :roundId")
  Integer findMaxPointsByRoundId(@Param("roundId") Long roundId);
}
