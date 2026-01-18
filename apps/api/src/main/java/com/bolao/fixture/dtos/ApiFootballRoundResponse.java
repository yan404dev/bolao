package com.bolao.fixture.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiFootballRoundResponse extends ApiFootballResponse<ApiFootballRoundResponse.RoundItem> {

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class RoundItem {
    private String round;
    private List<String> dates;
  }
}
