package com.bolao.round.services;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.entities.Prediction;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.ScoreCalculator;
import com.bolao.round.entities.Match;
import com.bolao.round.repositories.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoundScoringService {

  private final BetRepository betRepository;
  private final ScoreCalculator scoreCalculator;
  private final MatchRepository matchRepository;

  @Transactional
  public void calculateScores(Long roundId, List<Match> updatedMatches) {
    List<Bet> bets = betRepository.findByRoundId(roundId);
    // Get ALL matches from DB to find prediction IDs
    List<Match> allDbMatches = matchRepository.findByRoundId(roundId);
    List<Match> uniqueMatches = deduplicateMatches(updatedMatches);

    for (Bet bet : bets) {
      BetScoreBreakdown breakdown = calculateBetScoreBreakdown(bet, uniqueMatches, allDbMatches);
      bet.setPoints(breakdown.totalPoints());
      betRepository.save(bet);
    }
  }

  public BetScoreBreakdown calculateBetScoreBreakdown(Bet bet, List<Match> matches) {
    return calculateBetScoreBreakdown(bet, matches, matches);
  }

  public BetScoreBreakdown calculateBetScoreBreakdown(Bet bet, List<Match> matches, List<Match> allMatches) {
    List<Match> uniqueMatches = deduplicateMatches(matches);

    int totalPoints = 0;
    int exact = 0;
    int winner = 0;
    int wrong = 0;

    for (Match match : uniqueMatches) {
      if (!match.isFinished()) {
        continue;
      }

      // Try to find prediction by any match ID (including duplicates)
      Prediction prediction = findPredictionForMatch(bet, match, allMatches);
      if (prediction == null) {
        wrong++;
        continue;
      }

      int points = scoreCalculator.calculate(prediction, match);
      totalPoints += points;

      if (points == 3) {
        exact++;
      } else if (points == 1) {
        winner++;
      } else {
        wrong++;
      }
    }

    return new BetScoreBreakdown(totalPoints, exact, winner, wrong);
  }

  private List<Match> deduplicateMatches(List<Match> matches) {
    Set<String> seen = new HashSet<>();
    List<Match> unique = new ArrayList<>();
    for (Match match : matches) {
      String key = match.getHomeTeam() + " vs " + match.getAwayTeam();
      if (!seen.contains(key)) {
        seen.add(key);
        unique.add(match);
      }
    }
    return unique;
  }

  private Prediction findPredictionForMatch(Bet bet, Match uniqueMatch, List<Match> allMatches) {
    // First try the unique match ID
    Prediction prediction = bet.getPredictions().get(uniqueMatch.getId());
    if (prediction != null) {
      return prediction;
    }

    // If not found, look for predictions in any match with same teams
    for (Match m : allMatches) {
      if (m.getHomeTeam().equals(uniqueMatch.getHomeTeam()) &&
          m.getAwayTeam().equals(uniqueMatch.getAwayTeam())) {
        prediction = bet.getPredictions().get(m.getId());
        if (prediction != null) {
          return prediction;
        }
      }
    }
    return null;
  }
}
