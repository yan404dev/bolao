package com.bolao.bet.usecases;

import com.bolao.bet.BetService;
import com.bolao.bet.entities.Bet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class GetBetByIdUseCase {

  private final BetService betService;

  public Optional<Bet> execute(Long id) {
    return betService.findById(id);
  }
}
