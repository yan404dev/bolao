package com.bolao.round.usecases;

import com.bolao.fixture.MatchSyncService;
import com.bolao.round.entities.Match;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.round.services.RoundScoringService;
import com.bolao.round.services.RoundStatsService;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProcessRoundResultsUseCase {

  private final RoundRepository roundRepository;
  private final MatchSyncService matchSyncService;
  private final RoundScoringService scoringService;
  private final RoundStatsService statsService;
  private final BetRepository betRepository;

  @Transactional
  public void execute(Long roundId) {
    Round round = roundRepository.findById(roundId)
        .orElseThrow(() -> new NotFoundException("Round not found: " + roundId));

    int leagueId = round.getExternalLeagueId() != null ? round.getExternalLeagueId() : 39;
    int season = round.getExternalSeason() != null ? round.getExternalSeason() : 2024;

    List<Match> matches = matchSyncService.fetchAndSyncMatches(leagueId, season, roundId, round.getExternalRoundId());

    scoringService.calculateScores(roundId, matches);
    statsService.updateRoundStats(roundId);

    Integer maxPoints = betRepository.findMaxPointsByRoundId(roundId);
    if (maxPoints != null && maxPoints < 15) {
      round.setAccumulated(true);
      roundRepository.save(round);
    }
  }
}
