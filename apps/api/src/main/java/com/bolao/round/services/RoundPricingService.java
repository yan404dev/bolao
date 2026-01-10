package com.bolao.round.services;

import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.shared.entities.ResultEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoundPricingService {

  private static final double STANDARD_PRICE = 10.0;
  private static final double ACCUMULATED_PRICE = 20.0;
  private static final int WINNING_SCORE_THRESHOLD = 15;

  private final RoundRepository roundRepository;
  private final RoundRankingService rankingService;

  public double calculateInitialTicketPrice(LocalDateTime currentRoundDate) {
    if (currentRoundDate == null) {
      return STANDARD_PRICE;
    }

    return roundRepository.findPreviousRound(currentRoundDate)
        .map(this::determinePriceBasedOnPrevious)
        .orElse(STANDARD_PRICE);
  }

  private double determinePriceBasedOnPrevious(Round previousRound) {
    if (wasAccumulated(previousRound)) {
      log.info("Round {}: Resetting price (Previous was accumulated)", previousRound.getId());
      return STANDARD_PRICE;
    }

    if (!hasWinner(previousRound)) {
      log.info("Round {}: Accumulating price (No winner with >= {} pts)", previousRound.getId(),
          WINNING_SCORE_THRESHOLD);
      return ACCUMULATED_PRICE;
    }

    return STANDARD_PRICE;
  }

  private boolean wasAccumulated(Round round) {
    return round.getTicketPrice() != null && round.getTicketPrice() >= ACCUMULATED_PRICE;
  }

  private boolean hasWinner(Round round) {
    try {
      int topScore = getTopScore(round);
      return topScore >= WINNING_SCORE_THRESHOLD;
    } catch (Exception e) {
      log.error("Failed to check winner for round {}. Assuming winner to prevent error accumulation.", round.getId(),
          e);
      return true;
    }
  }

  private int getTopScore(Round round) {
    ResultEntity<RankingDto> ranking = rankingService.getRanking(
        round.getId(), null, null, PageRequest.of(0, 1));

    return ranking.getItems().stream()
        .findFirst()
        .map(RankingDto::getPoints)
        .orElse(0);
  }
}
