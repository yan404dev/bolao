package com.bolao.bet.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CreateBetDto {
  @NotNull
  private Long roundId;

  @NotBlank
  private String name;

  @NotBlank
  private String phone;

  @Valid
  @NotNull
  private List<PredictionDto> predictions;
}
