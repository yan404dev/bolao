package com.bolao.round.services;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.round.services.RoundPricingService;
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

    long paidCount = betRepository.findByRoundIdAndStatus(roundId, Bet.PaymentStatus.PAID).size();

    double ticketPrice = round.getTicketPrice() != null ? round.getTicketPrice() : RoundPricingService.STANDARD_PRICE;
    double prizeContribution = RoundPricingService.getPrizeContribution(ticketPrice);

    round.setTotalTickets((int) paidCount);
    round.setPrizePool(paidCount * prizeContribution);

    roundRepository.save(round);
  }
}
