package com.bolao.fixture.usecases;

import com.bolao.fixture.MatchSyncService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class GetExternalCalendarUseCase {

  private final MatchSyncService matchSyncService;

  @Value("${api.football.league.id:39}")
  private int defaultLeagueId;

  @Value("${api.football.season:2026}")
  private int defaultSeason;

  public GetExternalCalendarUseCase(MatchSyncService matchSyncService) {
    this.matchSyncService = matchSyncService;
  }

  public List<String> execute(Integer leagueId, Integer season) {
    int targetLeagueId = leagueId != null ? leagueId : defaultLeagueId;
    int targetSeason = season != null ? season : defaultSeason;

    log.info("Executing GetExternalCalendarUseCase for league {} season {}", targetLeagueId, targetSeason);
    return matchSyncService.fetchAvailableRounds(targetLeagueId, targetSeason);
  }
}
