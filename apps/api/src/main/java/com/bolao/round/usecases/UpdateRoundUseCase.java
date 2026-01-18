package com.bolao.round.usecases;

import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class UpdateRoundUseCase {

  private final RoundRepository roundRepository;

  @Transactional
  public Round execute(Long roundId, LocalDateTime endDate) {
    log.info("Manually updating round {} end date to {}", roundId, endDate);

    Round round = roundRepository.findById(roundId)
        .orElseThrow(() -> new NotFoundException("Round not found: " + roundId));

    if (endDate != null) {
      round.setEndDate(endDate);
    }

    return roundRepository.save(round);
  }
}
