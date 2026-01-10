package com.bolao.standings.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StandingDto {
  private Integer position;
  private String teamName;
  private String teamLogo;
  private Integer points;
  private Integer played;
  private Integer won;
  private Integer drawn;
  private Integer lost;
  private Integer goalsFor;
  private Integer goalsAgainst;
  private Integer goalDifference;
}
