package com.bolao.fixture.usecases;

import com.bolao.fixture.ExternalMatchProvider;
import com.bolao.fixture.entities.League;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ListLeaguesUseCase {

  private final ExternalMatchProvider externalMatchProvider;

  public List<League> execute(String country) {
    return externalMatchProvider.fetchLeagues(country);
  }
}
