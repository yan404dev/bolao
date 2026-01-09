package com.bolao.bet.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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

  @NotEmpty
  private List<PredictionDto> predictions;
}
