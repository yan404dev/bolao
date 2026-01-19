package com.bolao.standings.usecases;

import com.bolao.standings.StandingsService;
import com.bolao.standings.dtos.StandingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GetChampionshipStandingsUseCase {

  private final StandingsService standingsService;

  public List<StandingDto> execute() {
    return standingsService.calculateStandings();
  }
}
