package com.bolao.round.usecases;

import com.bolao.round.RoundService;
import com.bolao.round.entities.Round;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ListRoundsUseCase {

  private final RoundService roundService;

  public List<Round> execute(Round.Status status) {
    log.info("Executing ListRoundsUseCase with status: {}", status);
    return roundService.findAll(status);
  }
}
