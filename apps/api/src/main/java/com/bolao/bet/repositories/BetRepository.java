package com.bolao.bet.repositories;

import com.bolao.bet.entities.Bet;
import com.bolao.shared.repositories.BaseRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BetRepository extends BaseRepository<Bet, Long> {
  List<Bet> findByRoundId(Long roundId);

  Page<Bet> findByRoundIdWithFilters(Long roundId, String search, Integer minPoints, Pageable pageable);

  Optional<Bet> findByTicketCode(String ticketCode);

  long countByRoundId(Long roundId);

  List<Bet> findByRoundIdAndStatus(Long roundId, Bet.PaymentStatus status);

  Integer findMaxPointsByRoundId(Long roundId);
}
