package com.bolao.bet.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Prediction {
  private Long matchId;
  private Integer homeScore;
  private Integer awayScore;
}
