package com.bolao.round.usecases;

import com.bolao.round.RoundService;
import com.bolao.round.entities.Round;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GetRoundByIdUseCase {

  private final RoundService roundService;

  public Round execute(Long id) {
    return roundService.findById(id);
  }
}
