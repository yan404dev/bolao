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
    return execute(status, null);
  }

  public List<Round> execute(Round.Status status, Integer limit) {
    List<Round> rounds = roundService.findAll(status);
    if (limit != null && limit > 0 && rounds.size() > limit) {
      return rounds.subList(0, limit);
    }
    return rounds;
  }
}
