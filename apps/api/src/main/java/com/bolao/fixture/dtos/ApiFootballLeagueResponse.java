package com.bolao.fixture.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiFootballLeagueResponse extends ApiFootballResponse<ApiFootballLeagueResponse.LeagueItem> {

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class LeagueItem {
    private League league;
    private Country country;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class League {
    private int id;
    private String name;
    private String logo;
    private String type;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Country {
    private String name;
    private String code;
    private String flag;
  }
}
