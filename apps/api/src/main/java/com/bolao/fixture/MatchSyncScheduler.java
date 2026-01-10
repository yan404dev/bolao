package com.bolao.fixture;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class MatchSyncScheduler {

  private final MatchSyncService matchSyncService;

  @Scheduled(fixedDelay = 60000)
  public void syncLiveScores() {
    log.debug("Triggering scheduled live scores sync");
    try {
      matchSyncService.syncLiveScores();
    } catch (Exception e) {
      log.error("Scheduled live scores sync failed: {}", e.getMessage());
    }
  }
}
