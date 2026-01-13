package com.bolao.round.dtos;

import lombok.Data;
import java.util.List;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Data
public class BatchActionDto {
  @NotEmpty(message = "List of IDs cannot be empty")
  private List<Long> ids;

  @NotNull(message = "Action is required")
  private String action;
}
