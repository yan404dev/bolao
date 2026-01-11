package com.bolao.bet.usecases;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class ConfirmBetPaymentUseCase {

  private final BetRepository betRepository;
  private final RoundRepository roundRepository;

  @Transactional
  public void execute(Long betId, LocalDateTime paidAt) {
    Bet bet = betRepository.findById(betId)
        .orElseThrow(() -> new NotFoundException("Bet not found for ID: " + betId));

    if (bet.getStatus() == Bet.PaymentStatus.PAID) {
      log.info("Bet {} already marked as PAID, skipping.", betId);
      return;
    }

    Round round = roundRepository.findById(bet.getRoundId())
        .orElseThrow(() -> new NotFoundException("Round not found for ID: " + bet.getRoundId()));

    if (isPaymentLate(round, paidAt)) {
      log.warn("Late payment received for bet {}. Paid at: {}, Round deadline: {}. Marking as CANCELLED.",
          betId, paidAt, round.getStartDate());
      bet.setStatus(Bet.PaymentStatus.CANCELLED);
    } else {
      bet.setStatus(Bet.PaymentStatus.PAID);
      log.info("Bet {} successfully marked as PAID (on time)", betId);
    }

    betRepository.save(bet);
  }

  private boolean isPaymentLate(Round round, LocalDateTime paidAt) {
    if (round.getStartDate() == null) {
      return false;
    }
    LocalDateTime deadline = round.getStartDate().minusMinutes(1);
    return paidAt.isAfter(deadline);
  }
}
