package com.bolao.bet.repositories;

import com.bolao.bet.entities.BetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface JpaBetRepository extends JpaRepository<BetEntity, Long>, JpaSpecificationExecutor<BetEntity> {
  List<BetEntity> findByRoundIdOrderByPointsDesc(Long roundId);

  Optional<BetEntity> findByTicketCode(String ticketCode);

  long countByRoundId(Long roundId);
}
