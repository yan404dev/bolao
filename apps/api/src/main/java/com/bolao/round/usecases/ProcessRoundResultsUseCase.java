package com.bolao.round.usecases;

import com.bolao.fixture.MatchSyncService;
import com.bolao.round.entities.Match;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.round.services.RoundScoringService;
import com.bolao.round.services.RoundStatsService;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ProcessRoundResultsUseCase {

  private final RoundRepository roundRepository;
  private final MatchSyncService matchSyncService;
  private final RoundScoringService scoringService;
  private final RoundStatsService statsService;

  @Transactional
  public void execute(Long roundId) {
    log.info("Starting ProcessRoundResultsUseCase for round: {}", roundId);

    Round round = roundRepository.findById(roundId)
        .orElseThrow(() -> new NotFoundException("Round not found: " + roundId));

    List<Match> matches = matchSyncService.fetchAndSyncMatches(roundId, round.getExternalRoundId());

    scoringService.calculateScores(roundId, matches);

    statsService.updateRoundStats(roundId);

    log.info("Successfully processed results for round: {}", roundId);
  }
}
