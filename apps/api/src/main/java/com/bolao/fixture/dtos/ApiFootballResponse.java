package com.bolao.fixture.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiFootballResponse<T> {
  private List<T> response = new ArrayList<>();
  private Object errors;
  private int results;
}
