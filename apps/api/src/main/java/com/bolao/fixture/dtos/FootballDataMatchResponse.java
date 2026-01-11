package com.bolao.fixture.dtos;

import com.bolao.round.entities.Match;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FootballDataMatchResponse {

  private Filters filters;
  private ResultSet resultSet;
  private Competition competition;
  private List<MatchData> matches;

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Filters {
    private String season;
    private String matchday;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class ResultSet {
    private int count;
    private String first;
    private String last;
    private int played;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Competition {
    private int id;
    private String name;
    private String code;
    private String type;
    private String emblem;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class MatchData {
    private int id;
    private OffsetDateTime utcDate;
    private String status;
    private int matchday;
    private String stage;
    private String group;
    private OffsetDateTime lastUpdated;
    private Team homeTeam;
    private Team awayTeam;
    private Score score;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Team {
    private int id;
    private String name;
    private String shortName;
    private String tla;
    private String crest;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Score {
    private String winner;
    private String duration;
    private FullTime fullTime;
    private HalfTime halfTime;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class FullTime {
    private Integer home;
    private Integer away;
  }

  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class HalfTime {
    private Integer home;
    private Integer away;
  }

  public List<Match> toDomainMatches() {
    if (matches == null)
      return List.of();

    return matches.stream()
        .map(this::toMatch)
        .collect(Collectors.toList());
  }

  private Match toMatch(MatchData data) {
    Match match = new Match();
    match.setHomeTeam(data.getHomeTeam() != null ? data.getHomeTeam().getName() : "TBD");
    match.setHomeTeamLogo(data.getHomeTeam() != null ? data.getHomeTeam().getCrest() : null);
    match.setAwayTeam(data.getAwayTeam() != null ? data.getAwayTeam().getName() : "TBD");
    match.setAwayTeamLogo(data.getAwayTeam() != null ? data.getAwayTeam().getCrest() : null);
    match.setKickoffTime(data.getUtcDate() != null ? data.getUtcDate().toLocalDateTime() : null);
    match.setStatus(mapStatus(data.getStatus()));

    if (data.getScore() != null && data.getScore().getFullTime() != null) {
      match.setHomeScore(data.getScore().getFullTime().getHome());
      match.setAwayScore(data.getScore().getFullTime().getAway());
    }

    return match;
  }

  private Match.Status mapStatus(String status) {
    if (status == null)
      return Match.Status.SCHEDULED;

    return switch (status) {
      case "SCHEDULED", "TIMED" -> Match.Status.SCHEDULED;
      case "IN_PLAY", "PAUSED" -> Match.Status.LIVE;
      case "FINISHED" -> Match.Status.FINISHED;
      case "POSTPONED" -> Match.Status.POSTPONED;
      case "CANCELLED" -> Match.Status.CANCELLED;
      default -> Match.Status.SCHEDULED;
    };
  }
}
