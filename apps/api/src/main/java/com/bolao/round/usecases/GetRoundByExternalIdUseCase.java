package com.bolao.round.usecases;

import com.bolao.round.RoundService;
import com.bolao.round.entities.Round;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GetRoundByExternalIdUseCase {

  private final RoundService roundService;

  public Round execute(String externalId) {
    return roundService.findByExternalRoundId(externalId);
  }
}
