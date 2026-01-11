package com.bolao.fixture.usecases;

import com.bolao.fixture.MatchSyncService;
import com.bolao.round.entities.Round;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
public class SyncAllRoundsUseCase {

  private final MatchSyncService matchSyncService;

  @Value("${api.football.league.id:39}")
  private int defaultLeagueId;

  @Value("${api.football.season:2026}")
  private int defaultSeason;

  public SyncAllRoundsUseCase(MatchSyncService matchSyncService) {
    this.matchSyncService = matchSyncService;
  }

  @Transactional
  public List<Round> execute(Integer leagueId, Integer season) {
    int targetLeagueId = leagueId != null ? leagueId : defaultLeagueId;
    int targetSeason = season != null ? season : defaultSeason;

    log.info("Executing SyncAllRoundsUseCase for league {} season {}", targetLeagueId, targetSeason);
    return matchSyncService.syncAllRounds(targetLeagueId, targetSeason);
  }
}
