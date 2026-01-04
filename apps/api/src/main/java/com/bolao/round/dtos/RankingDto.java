package com.bolao.round.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RankingDto {
  private int position;
  private String name;
  private String ticketCode;
  private int points;
}
