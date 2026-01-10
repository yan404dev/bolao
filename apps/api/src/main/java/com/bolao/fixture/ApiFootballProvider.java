package com.bolao.fixture;

import com.bolao.fixture.dtos.ApiFootballResponse;
import com.bolao.fixture.dtos.ApiFootballRoundsResponse;
import com.bolao.round.entities.Match;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class ApiFootballProvider implements ExternalMatchProvider {

  private final RestClient apiFootballClient;

  @Value("${api-football.league-id:71}")
  private Integer leagueId;

  @Value("${api-football.season:2026}")
  private Integer season;

  private static final Set<String> FINISHED_STATUSES = Set.of("FT", "AET", "PEN");
  private static final Set<String> LIVE_STATUSES = Set.of("1T", "2T", "HT", "P", "BT", "LIVE");

  @Override
  public List<Match> fetchMatchesByRound(String roundName) {
    log.info("Fetching matches for round: {} from API-Football", roundName);

    try {
      ApiFootballResponse response = apiFootballClient.get()
          .uri(uriBuilder -> uriBuilder
              .path("/fixtures")
              .queryParam("league", leagueId)
              .queryParam("season", season)
              .queryParam("round", roundName)
              .build())
          .retrieve()
          .body(ApiFootballResponse.class);

      if (response == null || response.getResponse() == null) {
        return Collections.emptyList();
      }

      return response.getResponse().stream()
          .map(this::mapToMatch)
          .toList();
    } catch (Exception e) {
      log.error("Failed to fetch matches from API-Football: {}", e.getMessage());
      return Collections.emptyList();
    }
  }

  @Override
  public List<Match> fetchLiveScores() {
    log.info("Fetching live scores from API-Football");
    try {
      ApiFootballResponse response = apiFootballClient.get()
          .uri(uriBuilder -> uriBuilder
              .path("/fixtures")
              .queryParam("live", "all")
              .queryParam("league", leagueId)
              .build())
          .retrieve()
          .body(ApiFootballResponse.class);

      if (response == null || response.getResponse() == null) {
        return Collections.emptyList();
      }

      return response.getResponse().stream()
          .map(this::mapToMatch)
          .toList();
    } catch (Exception e) {
      log.error("Failed to fetch live scores from API-Football: {}", e.getMessage());
      return Collections.emptyList();
    }
  }

  @Override
  public String getProviderName() {
    return "api-football";
  }

  @Override
  public List<String> fetchAvailableRounds() {
    log.info("Fetching all available rounds for league {} and season {}", leagueId, season);
    try {
      ApiFootballRoundsResponse response = apiFootballClient.get()
          .uri(uriBuilder -> uriBuilder
              .path("/fixtures/rounds")
              .queryParam("league", leagueId)
              .queryParam("season", season)
              .build())
          .retrieve()
          .body(ApiFootballRoundsResponse.class);

      return response != null && response.getResponse() != null
          ? response.getResponse()
          : Collections.emptyList();
    } catch (Exception e) {
      log.error("Failed to fetch available rounds from API-Football: {}", e.getMessage());
      return Collections.emptyList();
    }
  }

  private Match mapToMatch(ApiFootballResponse.ApiFootballFixtureItem item) {
    var fixture = item.getFixture();
    var teams = item.getTeams();
    var goals = item.getGoals();

    return Match.builder()
        .id(fixture.getId())
        .homeTeam(teams.getHome().getName())
        .homeTeamLogo(teams.getHome().getLogo())
        .homeScore(goals.getHome())
        .awayTeam(teams.getAway().getName())
        .awayTeamLogo(teams.getAway().getLogo())
        .awayScore(goals.getAway())
        .kickoffTime(OffsetDateTime.parse(fixture.getDate()).toLocalDateTime())
        .status(mapStatus(fixture.getStatus().getShortStatus()))
        .build();
  }

  private Match.Status mapStatus(String shortStatus) {
    if (FINISHED_STATUSES.contains(shortStatus)) {
      return Match.Status.FINISHED;
    }
    if (LIVE_STATUSES.contains(shortStatus)) {
      return Match.Status.LIVE;
    }
    return Match.Status.SCHEDULED;
  }
}
