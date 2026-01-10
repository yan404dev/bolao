package com.bolao.fixture.usecases;

import com.bolao.fixture.MatchSyncService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class GetExternalCalendarUseCase {

  private final MatchSyncService matchSyncService;

  public List<String> execute() {
    log.info("Executing GetExternalCalendarUseCase");
    return matchSyncService.fetchAvailableRounds();
  }
}
