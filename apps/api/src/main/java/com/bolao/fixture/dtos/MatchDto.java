package com.bolao.fixture.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MatchDto {
  private String id;
  private String externalId;

  @JsonProperty("rodadaId")
  private String roundId;

  @JsonProperty("competicao")
  private String competition;

  @JsonProperty("nomeCasa")
  private String homeTeamName;

  @JsonProperty("nomeAbreviadoCasa")
  private String homeTeamShortName;

  @JsonProperty("escudoCasa")
  private String homeTeamLogo;

  @JsonProperty("nomeVisitante")
  private String awayTeamName;

  @JsonProperty("nomeAbreviadoVisitante")
  private String awayTeamShortName;

  @JsonProperty("escudoVisitante")
  private String awayTeamLogo;

  @JsonProperty("encerrado")
  private boolean finished;

  @JsonProperty("golsCasa")
  private Integer homeGoals;

  @JsonProperty("golsVisitante")
  private Integer awayGoals;

  private String status;

  @JsonProperty("dataHora")
  private String dateTime;

  @JsonProperty("oddCasa")
  private String homeOdd;

  @JsonProperty("oddEmpate")
  private String drawOdd;

  @JsonProperty("oddVisitante")
  private String awayOdd;
}
