package com.bolao.bet.usecases;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class ConfirmBetPaymentUseCase {

  private final BetRepository betRepository;
  private final RoundRepository roundRepository;

  @Transactional
  public void execute(Long betId, LocalDateTime paidAt) {
    Bet bet = betRepository.findById(betId)
        .orElseThrow(() -> new NotFoundException("Bet not found: " + betId));

    if (bet.getStatus() == Bet.PaymentStatus.PAID) {
      return;
    }

    bet.setStatus(Bet.PaymentStatus.PAID);
    betRepository.save(bet);

    Round round = roundRepository.findById(bet.getRoundId())
        .orElseThrow(() -> new NotFoundException("Round not found: " + bet.getRoundId()));

    Double ticketPrice = round.getTicketPrice() != null ? round.getTicketPrice() : 10.0;
    Double currentPrize = round.getPrizePool() != null ? round.getPrizePool() : 0.0;
    round.setPrizePool(currentPrize + ticketPrice);
    roundRepository.save(round);
  }
}
