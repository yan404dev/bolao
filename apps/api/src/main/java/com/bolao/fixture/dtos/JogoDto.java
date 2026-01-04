package com.bolao.fixture.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class JogoDto {
  private String id;
  private String externalId;
  private String rodadaId;
  private String competicao;
  private String nomeCasa;
  private String nomeAbreviadoCasa;
  private String escudoCasa;
  private String nomeVisitante;
  private String nomeAbreviadoVisitante;
  private String escudoVisitante;
  private boolean encerrado;
  private Integer golsCasa;
  private Integer golsVisitante;
  private String status;
  private String dataHora;
  private String oddCasa;
  private String oddEmpate;
  private String oddVisitante;
}
