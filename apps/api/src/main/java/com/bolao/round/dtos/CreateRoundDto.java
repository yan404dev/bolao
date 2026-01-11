package com.bolao.round.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateRoundDto {

  @NotBlank
  private String title;

  @NotBlank
  private String externalRoundId;

  @NotNull
  private Double ticketPrice;

  private Integer leagueId;
  private Integer season;
}
