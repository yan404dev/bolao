package com.bolao.fixture.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiFootballResponse {
  private List<ApiFootballFixtureItem> response;

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class ApiFootballFixtureItem {
    private Fixture fixture;
    private Teams teams;
    private Goals goals;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Fixture {
    private Long id;
    private String date;
    private Status status;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Status {
    private String shortStatus;
    @JsonProperty("elapsed")
    private Integer elapsed;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Teams {
    private Team home;
    private Team away;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Team {
    private Long id;
    private String name;
    private String logo;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Goals {
    private Integer home;
    private Integer away;
  }
}
