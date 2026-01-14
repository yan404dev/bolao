package com.bolao.bet.usecases;

import com.bolao.bet.BetService;
import com.bolao.bet.entities.Bet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class GetBetByIdUseCase {

  private final BetService betService;

  public Optional<Bet> execute(Long id) {
    log.info("Executing GetBetByIdUseCase for ID: {}", id);
    return betService.findById(id);
  }
}
