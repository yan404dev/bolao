package com.bolao.round.services;

public record BetScoreBreakdown(
    int totalPoints,
    int exactScores,
    int winnerScores) {
  public static BetScoreBreakdown empty() {
    return new BetScoreBreakdown(0, 0, 0);
  }
}
