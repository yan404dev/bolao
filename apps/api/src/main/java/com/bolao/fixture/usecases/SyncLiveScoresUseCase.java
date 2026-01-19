package com.bolao.fixture.usecases;

import com.bolao.fixture.MatchSyncService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SyncLiveScoresUseCase {

  private final MatchSyncService matchSyncService;

  public void execute() {
    matchSyncService.syncLiveScores();
  }
}
