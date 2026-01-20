package com.bolao.round;

import com.bolao.bet.entities.Prediction;
import com.bolao.round.entities.Match;
import org.springframework.stereotype.Component;

@Component
public class ScoreCalculator {

  private static final int EXACT_SCORE_POINTS = 3;
  private static final int CORRECT_WINNER_POINTS = 1;

  public enum MatchResult {
    HOME_WIN, AWAY_WIN, DRAW
  }

  public int calculate(Prediction prediction, Match match) {
    if (prediction == null || match == null) {
      return 0;
    }

    Integer predHome = prediction.getHomeScore();
    Integer predAway = prediction.getAwayScore();
    Integer realHome = match.getHomeScore();
    Integer realAway = match.getAwayScore();

    if (predHome == null || predAway == null || realHome == null || realAway == null) {
      return 0;
    }

    if (predHome.equals(realHome) && predAway.equals(realAway)) {
      return EXACT_SCORE_POINTS;
    }

    if (getResult(predHome, predAway) == getResult(realHome, realAway)) {
      return CORRECT_WINNER_POINTS;
    }

    return 0;
  }

  private MatchResult getResult(Integer home, Integer away) {
    if (home > away)
      return MatchResult.HOME_WIN;
    if (home < away)
      return MatchResult.AWAY_WIN;
    return MatchResult.DRAW;
  }
}
