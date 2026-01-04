package com.bolao.bet.repositories;

import com.bolao.bet.entities.Bet;
import com.bolao.shared.repositories.BaseRepository;

import java.util.List;
import java.util.Optional;

public interface BetRepository extends BaseRepository<Bet, Long> {
  List<Bet> findByRoundId(Long roundId);

  Optional<Bet> findByTicketCode(String ticketCode);

  long countByRoundId(Long roundId);
}
