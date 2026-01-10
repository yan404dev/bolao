package com.bolao.round.services;

import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.shared.entities.ResultEntity;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoundStatsService {

  private static final int WINNING_SCORE_THRESHOLD = 15;

  private final RoundRepository roundRepository;
  private final BetRepository betRepository;
  private final RoundRankingService rankingService;

  @Transactional
  public void updateRoundStats(Long roundId) {
    Round round = roundRepository.findById(roundId)
        .orElseThrow(() -> new NotFoundException("Round not found: " + roundId));

    long ticketCount = betRepository.countByRoundId(roundId);
    double currentRevenue = ticketCount * (round.getTicketPrice() != null ? round.getTicketPrice() : 0.0);
    double accumulatedValue = 0.0;

    // Check if previous round accumulated and carry over its prize pool
    if (round.getStartDate() != null) {
      accumulatedValue = roundRepository.findPreviousRound(round.getStartDate())
          .filter(prev -> !hasWinner(prev))
          .map(Round::getPrizePool)
          .orElse(0.0);
    }

    double prizePool = currentRevenue + accumulatedValue;

    round.setTotalTickets((int) ticketCount);
    round.setPrizePool(prizePool);

    roundRepository.save(round);
    log.info("Updated stats for round {}: {} tickets, prize pool R$ {} (Arrecadado: {}, Acumulado: {})",
        roundId, ticketCount, prizePool, currentRevenue, accumulatedValue);
  }

  private boolean hasWinner(Round round) {
    try {
      ResultEntity<RankingDto> ranking = rankingService.getRanking(
          round.getId(), null, null, PageRequest.of(0, 1));

      int topScore = ranking.getItems().stream()
          .findFirst()
          .map(RankingDto::getPoints)
          .orElse(0);

      return topScore >= WINNING_SCORE_THRESHOLD;
    } catch (Exception e) {
      log.error("Failed to check winner for round {}. Assuming winner to prevent excessive accumulation.",
          round.getId(),
          e);
      return true;
    }
  }
}
