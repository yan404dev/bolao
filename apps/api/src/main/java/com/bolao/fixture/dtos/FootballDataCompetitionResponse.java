package com.bolao.fixture.dtos;

import com.bolao.fixture.entities.League;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FootballDataCompetitionResponse {

  private int count;
  private Filters filters;
  private List<CompetitionData> competitions;

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Filters {
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class CompetitionData {
    private int id;
    private Area area;
    private String name;
    private String code;
    private String type;
    private String emblem;
    private String plan;
    private CurrentSeason currentSeason;
    private int numberOfAvailableSeasons;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Area {
    private int id;
    private String name;
    private String code;
    private String flag;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class CurrentSeason {
    private int id;
    private String startDate;
    private String endDate;
    private Integer currentMatchday;
  }

  public List<League> toDomainLeagues() {
    if (competitions == null)
      return List.of();

    return competitions.stream()
        .filter(c -> c.getCurrentSeason() != null)
        .map(c -> League.builder()
            .id(c.getId())
            .name(c.getName())
            .logo(c.getEmblem())
            .country(c.getArea() != null ? c.getArea().getName() : null)
            .build())
        .collect(Collectors.toList());
  }
}
