package com.bolao.fixture;

import com.bolao.fixture.dtos.ApiFootballFixtureResponse;
import com.bolao.fixture.dtos.ApiFootballLeagueResponse;
import com.bolao.fixture.dtos.ApiFootballStringResponse;
import com.bolao.round.entities.Match;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApiFootballProvider implements ExternalMatchProvider {

  private final RestClient restClient;

  @Value("${api.football.key}")
  private String apiKey;

  @Value("${api.football.league.id:13}")
  private int leagueId;

  @Value("${api.football.season:2026}")
  private int season;

  private static final String BASE_URL = "https://v3.football.api-sports.io";

  @Override
  public List<Match> fetchMatchesByRound(String externalRoundId) {
    log.info("Fetching matches for league {}, season {}, round {}", leagueId, season, externalRoundId);
    ApiFootballFixtureResponse response = restClient.get()
        .uri(BASE_URL + "/fixtures?league={leagueId}&season={season}&round={round}",
            leagueId, season, externalRoundId)
        .headers(h -> h.addAll(createHeaders()))
        .retrieve()
        .body(ApiFootballFixtureResponse.class);

    return response != null ? response.toDomainMatches() : new ArrayList<>();
  }

  @Override
  public List<String> fetchAvailableRounds() {
    log.info("Fetching available rounds for league {}, season {}", leagueId, season);
    log.debug("Using API key: {}...", apiKey != null && apiKey.length() > 10 ? apiKey.substring(0, 10) : "NULL");
    try {
      String uri = BASE_URL + "/fixtures/rounds?league=" + leagueId + "&season=" + season;
      log.info("Calling API: {}", uri);
      ApiFootballStringResponse response = restClient.get()
          .uri(uri)
          .headers(h -> h.addAll(createHeaders()))
          .retrieve()
          .body(ApiFootballStringResponse.class);

      log.info("API response: results={}, errors={}, rounds={}",
          response != null ? response.getResults() : "null",
          response != null ? response.getErrors() : "null",
          response != null ? response.getResponse().size() : 0);

      return response != null ? response.getResponse() : new ArrayList<>();
    } catch (Exception e) {
      log.error("Error fetching rounds from API-Football: {}", e.getMessage());
      return new ArrayList<>();
    }
  }

  @Override
  public String getChampionshipName() {
    return fetchChampionshipDetails().getName();
  }

  @Override
  public String getChampionshipLogo() {
    return fetchChampionshipDetails().getLogo();
  }

  private ApiFootballLeagueResponse.League fetchChampionshipDetails() {
    ApiFootballLeagueResponse response = restClient.get()
        .uri(BASE_URL + "/leagues?id={leagueId}", leagueId)
        .headers(h -> h.addAll(createHeaders()))
        .retrieve()
        .body(ApiFootballLeagueResponse.class);

    if (response != null && !response.getResponse().isEmpty()) {
      return response.getResponse().get(0).getLeague();
    }
    return new ApiFootballLeagueResponse.League();
  }

  private HttpHeaders createHeaders() {
    HttpHeaders headers = new HttpHeaders();
    headers.set("x-apisports-key", apiKey);
    return headers;
  }
}
