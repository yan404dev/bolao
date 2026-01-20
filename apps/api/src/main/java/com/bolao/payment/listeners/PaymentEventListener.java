package com.bolao.payment.listeners;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.payment.events.PaymentApprovedEvent;
import com.bolao.round.services.RoundStatsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PaymentEventListener {

  private final BetRepository betRepository;
  private final RoundStatsService roundStatsService;

  @EventListener
  public void handlePaymentApproved(PaymentApprovedEvent event) {
    log.info("Handling payment approved event for betId: {}", event.getBetId());

    betRepository.findById(event.getBetId()).ifPresent(bet -> {
      log.info("Updating stats for roundId: {} after payment approval", bet.getRoundId());
      roundStatsService.updateRoundStats(bet.getRoundId());
    });
  }
}
