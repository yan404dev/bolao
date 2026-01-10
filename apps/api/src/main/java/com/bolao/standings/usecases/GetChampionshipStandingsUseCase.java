package com.bolao.standings.usecases;

import com.bolao.standings.StandingsService;
import com.bolao.standings.dtos.StandingDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class GetChampionshipStandingsUseCase {

  private final StandingsService standingsService;

  public List<StandingDto> execute() {
    log.info("Executing GetChampionshipStandingsUseCase");
    return standingsService.calculateStandings();
  }
}
