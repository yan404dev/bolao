package com.bolao.round.services;

import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.shared.entities.ResultEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RoundPricingService {

  private static final double STANDARD_PRICE = 12.0;
  private static final double ACCUMULATED_PRICE = 25.0;
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
      return STANDARD_PRICE;
    }

    if (previousRound.getStatus() != Round.Status.CLOSED && previousRound.getStatus() != Round.Status.CALCULATED) {
      return STANDARD_PRICE;
    }

    if (!hasWinner(previousRound)) {
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
