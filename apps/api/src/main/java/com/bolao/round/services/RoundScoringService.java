package com.bolao.round.services;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.entities.Prediction;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.ScoreCalculator;
import com.bolao.round.entities.Match;
import com.bolao.round.repositories.MatchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoundScoringService {

  private final BetRepository betRepository;
  private final ScoreCalculator scoreCalculator;

  @Transactional
  public void calculateScores(Long roundId, List<Match> updatedMatches) {

    List<Bet> bets = betRepository.findByRoundId(roundId);
    log.info("Calculating scores for {} bets in round {}", bets.size(), roundId);

    for (Bet bet : bets) {
      BetScoreBreakdown breakdown = calculateBetScoreBreakdown(bet, updatedMatches);
      bet.setPoints(breakdown.totalPoints());
      betRepository.save(bet);
      log.info("Bet {} scored {} points", bet.getTicketCode(), breakdown.totalPoints());
    }
  }

  public BetScoreBreakdown calculateBetScoreBreakdown(Bet bet, List<Match> matches) {
    int totalPoints = 0;
    int exact = 0;
    int winner = 0;

    for (Match match : matches) {
      if (!match.isFinished()) {
        continue;
      }

      Prediction prediction = bet.getPredictions().get(match.getId());
      if (prediction == null) {
        continue;
      }

      int points = scoreCalculator.calculate(prediction, match);
      totalPoints += points;

      if (points == 3) {
        exact++;
      } else if (points == 1) {
        winner++;
      }
    }

    return new BetScoreBreakdown(totalPoints, exact, winner);
  }
}
