package com.bolao.round.usecases;

import com.bolao.round.entities.Round;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class BatchRoundActionUseCase {

  private final UpdateRoundStatusUseCase updateStatusUseCase;
  private final ProcessRoundResultsUseCase processResultsUseCase;

  @Transactional
  public void execute(List<Long> roundIds, String action) {
    for (Long id : roundIds) {
      try {
        processAction(id, action);
      } catch (Exception e) {
      }
    }
  }

  private void processAction(Long id, String action) {
    switch (action.toUpperCase()) {
      case "OPEN" -> updateStatusUseCase.execute(id, Round.Status.OPEN);
      case "CLOSE" -> updateStatusUseCase.execute(id, Round.Status.CLOSED);
      case "CALCULATE" -> processResultsUseCase.execute(id);
      default -> throw new IllegalArgumentException("Unknown batch action: " + action);
    }
  }
}
