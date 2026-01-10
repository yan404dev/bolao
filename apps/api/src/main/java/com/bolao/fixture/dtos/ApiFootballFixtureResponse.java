package com.bolao.fixture.dtos;

import com.bolao.round.entities.Match;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(callSuper = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiFootballFixtureResponse extends ApiFootballResponse<ApiFootballFixtureResponse.FixtureItem> {

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class FixtureItem {
    private Fixture fixture;
    private League league;
    private Teams teams;
    private Goals goals;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Fixture {
    private int id;
    private String date;
    private long timestamp;
    private Status status;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Status {
    @JsonProperty("short")
    private String shortStatus;
    @JsonProperty("long")
    private String longStatus;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class League {
    private int id;
    private String round;
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
    private int id;
    private String name;
    private String logo;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Goals {
    private Integer home;
    private Integer away;
  }

  public List<Match> toDomainMatches() {
    if (getResponse() == null)
      return new ArrayList<>();

    return getResponse().stream().map(item -> {
      Match.Status matchStatus = Match.Status.SCHEDULED;

      if (item.getFixture() != null && item.getFixture().getStatus() != null) {
        String status = item.getFixture().getStatus().getShortStatus();
        if ("FT".equals(status) || "AET".equals(status) || "PEN".equals(status)) {
          matchStatus = Match.Status.FINISHED;
        } else if ("1H".equals(status) || "2H".equals(status) || "HT".equals(status) || "ET".equals(status)
            || "P".equals(status)) {
          matchStatus = Match.Status.LIVE;
        }
      }

      return Match.builder()
          .id(item.getFixture() != null ? (long) item.getFixture().getId() : null)
          .homeTeam(item.getTeams() != null && item.getTeams().getHome() != null ? item.getTeams().getHome().getName()
              : "TBD")
          .homeTeamLogo(
              item.getTeams() != null && item.getTeams().getHome() != null ? item.getTeams().getHome().getLogo() : null)
          .homeScore(item.getGoals() != null ? item.getGoals().getHome() : null)
          .awayTeam(item.getTeams() != null && item.getTeams().getAway() != null ? item.getTeams().getAway().getName()
              : "TBD")
          .awayTeamLogo(
              item.getTeams() != null && item.getTeams().getAway() != null ? item.getTeams().getAway().getLogo() : null)
          .awayScore(item.getGoals() != null ? item.getGoals().getAway() : null)
          .kickoffTime(item.getFixture() != null ? LocalDateTime.ofInstant(
              Instant.ofEpochSecond(item.getFixture().getTimestamp()),
              ZoneId.systemDefault()) : null)
          .status(matchStatus)
          .build();
    }).collect(Collectors.toList());
  }
}
