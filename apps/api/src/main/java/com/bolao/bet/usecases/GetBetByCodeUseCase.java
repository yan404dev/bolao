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
public class GetBetByCodeUseCase {

  private final BetService betService;

  public Optional<Bet> execute(String ticketCode) {
    log.info("Executing GetBetByCodeUseCase for ticket: {}", ticketCode);
    return betService.findByTicketCode(ticketCode);
  }
}
