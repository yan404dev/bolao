package com.bolao.round.dtos;

import lombok.Builder;
import lombok.Data;

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
