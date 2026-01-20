package com.bolao.round.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RankingDto {
  private String name;
  private String ticketCode;
  private int points;
  private int position;
  private int exactScores;
  private int winnerScores;
}
