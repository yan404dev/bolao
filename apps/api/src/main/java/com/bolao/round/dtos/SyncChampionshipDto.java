package com.bolao.round.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SyncChampionshipDto {
  @NotNull(message = "League ID is required")
  private Integer leagueId;

  @NotNull(message = "Season is required")
  private Integer season;
}
