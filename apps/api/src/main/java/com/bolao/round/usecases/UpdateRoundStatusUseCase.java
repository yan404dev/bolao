package com.bolao.round.usecases;

import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class UpdateRoundStatusUseCase {

  private final RoundRepository roundRepository;

  @Transactional
  public Round execute(Long roundId, Round.Status status) {
    Round round = roundRepository.findById(roundId)
        .orElseThrow(() -> new NotFoundException("Round not found: " + roundId));

    round.setStatus(status);
    Round savedRound = roundRepository.save(round);

    if (status == Round.Status.CALCULATED) {
      openNextRound(savedRound);
    }

    return savedRound;
  }

  private void openNextRound(Round currentRound) {
    roundRepository.findFirstByExternalLeagueIdAndExternalSeasonAndStartDateGreaterThanOrderByStartDateAsc(
        currentRound.getExternalLeagueId(),
        currentRound.getExternalSeason(),
        currentRound.getStartDate()).ifPresent(nextRound -> {
          if (nextRound.getStatus() == Round.Status.CLOSED) {
            nextRound.setStatus(Round.Status.OPEN);
            roundRepository.save(nextRound);
          }
        });
  }
}
