package com.bolao.round.services;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RoundStatsService {

  private final BetRepository betRepository;
  private final RoundRepository roundRepository;

  @Transactional
  public void updateRoundStats(Long roundId) {
    Round round = roundRepository.findById(roundId).orElse(null);
    if (round == null)
      return;

    long paidCount = betRepository.findAll().stream()
        .filter(b -> b.getRoundId().equals(roundId) && b.getStatus() == Bet.PaymentStatus.PAID)
        .count();

    double ticketPrice = round.getTicketPrice() != null ? round.getTicketPrice() : 10.0;

    round.setTotalTickets((int) paidCount);
    round.setPrizePool(paidCount * ticketPrice);

    roundRepository.save(round);
  }
}
