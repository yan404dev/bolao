package com.bolao.fixture.usecases;

import com.bolao.fixture.MatchSyncService;
import com.bolao.round.entities.Round;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class SyncAllRoundsUseCase {

  private final MatchSyncService matchSyncService;

  @Transactional
  public List<Round> execute() {
    log.info("Executing SyncAllRoundsUseCase");
    return matchSyncService.syncAllRounds();
  }
}
