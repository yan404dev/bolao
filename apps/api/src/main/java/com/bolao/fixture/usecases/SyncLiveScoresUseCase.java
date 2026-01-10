package com.bolao.fixture.usecases;

import com.bolao.fixture.MatchSyncService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SyncLiveScoresUseCase {

  private final MatchSyncService matchSyncService;

  public void execute() {
    log.debug("Executing SyncLiveScoresUseCase");
    matchSyncService.syncLiveScores();
  }
}
