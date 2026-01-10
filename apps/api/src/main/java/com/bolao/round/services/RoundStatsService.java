package com.bolao.round.services;

import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoundStatsService {

  private final RoundRepository roundRepository;
  private final BetRepository betRepository;

  @Transactional
  public void updateRoundStats(Long roundId) {
    Round round = roundRepository.findById(roundId)
        .orElseThrow(() -> new NotFoundException("Round not found: " + roundId));

    long ticketCount = betRepository.countByRoundId(roundId);

    double totalRevenue = ticketCount * (round.getTicketPrice() != null ? round.getTicketPrice() : 0.0);
    double prizePool = totalRevenue;

    round.setTotalTickets((int) ticketCount);
    round.setPrizePool(prizePool);

    roundRepository.save(round);
    log.info("Updated stats for round {}: {} tickets, prize pool R$ {}", roundId, ticketCount, prizePool);
  }
}
