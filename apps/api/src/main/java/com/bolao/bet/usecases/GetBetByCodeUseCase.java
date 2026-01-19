package com.bolao.bet.usecases;

import com.bolao.bet.BetService;
import com.bolao.bet.entities.Bet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class GetBetByCodeUseCase {

  private final BetService betService;

  public Optional<Bet> execute(String ticketCode) {
    return betService.findByTicketCode(ticketCode);
  }
}
