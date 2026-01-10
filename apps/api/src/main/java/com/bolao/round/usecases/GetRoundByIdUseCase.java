package com.bolao.round.usecases;

import com.bolao.round.RoundService;
import com.bolao.round.entities.Round;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class GetRoundByIdUseCase {

  private final RoundService roundService;

  public Round execute(Long id) {
    log.info("Executing GetRoundByIdUseCase for ID: {}", id);
    return roundService.findById(id);
  }
}
