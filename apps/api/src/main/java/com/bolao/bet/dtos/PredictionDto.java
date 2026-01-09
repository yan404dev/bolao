package com.bolao.bet.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PredictionDto {

  @NotNull
  private Long matchId;

  @NotNull
  private Integer homeScore;

  @NotNull
  private Integer awayScore;
}
