package com.bolao.bet;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BetService {

  private final BetRepository betRepository;

  @Transactional(readOnly = true)
  public Optional<Bet> findByTicketCode(String ticketCode) {
    return betRepository.findByTicketCode(ticketCode);
  }

  @Transactional(readOnly = true)
  public List<Bet> findByRoundId(Long roundId) {
    return betRepository.findByRoundId(roundId);
  }
}
