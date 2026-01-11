package com.bolao.fixture.usecases;

import com.bolao.fixture.ExternalMatchProvider;
import com.bolao.fixture.entities.League;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ListLeaguesUseCase {

  private final ExternalMatchProvider externalMatchProvider;

  public List<League> execute(String country) {
    log.info("Executing ListLeaguesUseCase for country: {}", country);
    return externalMatchProvider.fetchLeagues(country);
  }
}
