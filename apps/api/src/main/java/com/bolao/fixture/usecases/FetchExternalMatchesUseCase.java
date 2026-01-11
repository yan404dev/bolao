package com.bolao.fixture.usecases;

import com.bolao.fixture.MatchSyncService;
import com.bolao.round.entities.Match;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class FetchExternalMatchesUseCase {

  private final MatchSyncService matchSyncService;

  @Value("${api.football.league.id:39}")
  private int defaultLeagueId;

  @Value("${api.football.season:2026}")
  private int defaultSeason;

  public List<Match> execute(Integer leagueId, Integer season, String externalRoundId) {
    int targetLeagueId = leagueId != null ? leagueId : defaultLeagueId;
    int targetSeason = season != null ? season : defaultSeason;

    log.info("Executing FetchExternalMatchesUseCase for league {} season {} round: {}",
        targetLeagueId, targetSeason, externalRoundId);
    return matchSyncService.fetchAndSyncMatches(targetLeagueId, targetSeason, null, externalRoundId);
  }
}
