package com.bolao.bet.usecases;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class CancelLatePendingBetsUseCase {

  private final BetRepository betRepository;
  private final RoundRepository roundRepository;

  @Transactional
  public void execute() {
    log.debug("Checking for late pending bets to cancel...");

    List<Round> nonOpenRounds = roundRepository.findAll().stream()
        .filter(r -> r.getStatus() == Round.Status.LIVE || r.getStatus() == Round.Status.CLOSED)
        .toList();

    for (Round round : nonOpenRounds) {
      List<Bet> pendingBets = betRepository.findByRoundIdAndStatus(round.getId(), Bet.PaymentStatus.PENDING);

      if (!pendingBets.isEmpty()) {
        log.info("Found {} pending bets for {} round {}. Cancelling them.",
            pendingBets.size(), round.getStatus(), round.getId());

        for (Bet bet : pendingBets) {
          bet.setStatus(Bet.PaymentStatus.CANCELLED);
          betRepository.save(bet);
        }
      }
    }
  }
}
