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
    int predHome = prediction.getHomeScore();
    int predAway = prediction.getAwayScore();
    int realHome = match.getHomeScore();
    int realAway = match.getAwayScore();

    if (predHome == realHome && predAway == realAway) {
      return EXACT_SCORE_POINTS;
    }

    if (getResult(predHome, predAway) == getResult(realHome, realAway)) {
      return CORRECT_WINNER_POINTS;
    }

    return 0;
  }

  private MatchResult getResult(int home, int away) {
    if (home > away)
      return MatchResult.HOME_WIN;
    if (home < away)
      return MatchResult.AWAY_WIN;
    return MatchResult.DRAW;
  }
}
