package com.bolao.fixture.usecases;

import com.bolao.fixture.MatchSyncService;
import com.bolao.round.entities.Match;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class FetchExternalMatchesUseCase {

  private final MatchSyncService matchSyncService;

  public List<Match> execute(String externalRoundId) {
    log.info("Executing FetchExternalMatchesUseCase for round: {}", externalRoundId);
    return matchSyncService.fetchAndSyncMatches(null, externalRoundId);
  }
}
