package com.bolao.fixture;

import com.bolao.fixture.usecases.SyncLiveScoresUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MatchSyncScheduler {

  private final SyncLiveScoresUseCase syncLiveScoresUseCase;

  @Scheduled(fixedDelay = 60000)
  public void syncLiveScores() {
    try {
      syncLiveScoresUseCase.execute();
    } catch (Exception e) {
    }
  }
}
