package com.bolao.fixture;

import com.bolao.fixture.dtos.ApiFootballFixtureResponse;
import com.bolao.fixture.dtos.ApiFootballLeagueResponse;
import com.bolao.fixture.dtos.ApiFootballRoundResponse;
import com.bolao.fixture.dtos.ApiFootballStringResponse;
import com.bolao.fixture.dtos.MatchResponseWrapper;
import com.bolao.fixture.entities.RoundDetails;
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

  @Value("${api.football.league.id:39}")
  private int defaultLeagueId;

  @Value("${api.football.season:2026}")
  private int defaultSeason;

  private static final String BASE_URL = "https://v3.football.api-sports.io";

  @Override
  public List<Match> fetchMatchesByRound(int leagueId, int season, String externalRoundId) {
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
  public MatchResponseWrapper fetchAllMatchesForSeason(int leagueId, int season) {
    log.info("Fetching all matches for league {}, season {}", leagueId, season);
    String champName = getChampionshipName(leagueId);
    String champLogo = getChampionshipLogo(leagueId);
    List<RoundDetails> rounds = fetchAvailableRounds(leagueId, season);
    List<Match> allMatches = new ArrayList<>();

    for (RoundDetails round : rounds) {
      List<Match> matches = fetchMatchesByRound(leagueId, season, round.getName());
      matches.forEach(m -> m.setExternalRoundId(round.getName()));
      allMatches.addAll(matches);
    }

    return MatchResponseWrapper.builder()
        .matches(allMatches)
        .championshipName(champName)
        .championshipLogo(champLogo)
        .roundDetails(rounds)
        .build();
  }

  @Override
  public List<RoundDetails> fetchAvailableRounds(int leagueId, int season) {
    log.info("Fetching available rounds for league {}, season {}", leagueId, season);
    log.debug("Using API key: {}...", apiKey != null && apiKey.length() > 10 ? apiKey.substring(0, 10) : "NULL");
    try {
      String uri = BASE_URL + "/fixtures/rounds?league=" + leagueId + "&season=" + season + "&dates=true";
      log.info("Calling API: {}", uri);
      ApiFootballRoundResponse response = restClient.get()
          .uri(uri)
          .headers(h -> h.addAll(createHeaders()))
          .retrieve()
          .body(ApiFootballRoundResponse.class);

      log.info("API response: results={}, errors={}, rounds={}",
          response != null ? response.getResults() : "null",
          response != null ? response.getErrors() : "null",
          response != null ? response.getResponse().size() : 0);

      if (response == null || response.getResponse() == null) {
        return new ArrayList<>();
      }

      return response.getResponse().stream()
          .map(item -> RoundDetails.builder()
              .name(item.getRound())
              .dates(item.getDates())
              .build())
          .toList();
    } catch (Exception e) {
      log.error("Error fetching rounds from API-Football: {}", e.getMessage());
      return new ArrayList<>();
    }
  }

  @Override
  public String getChampionshipName(int leagueId) {
    return fetchChampionshipDetails(leagueId).getName();
  }

  @Override
  public String getChampionshipLogo(int leagueId) {
    return fetchChampionshipDetails(leagueId).getLogo();
  }

  private ApiFootballLeagueResponse.League fetchChampionshipDetails(int leagueId) {
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

  @Override
  public List<com.bolao.fixture.entities.League> fetchLeagues(String country) {
    log.info("Fetching leagues for country: {}", country);
    String uri = BASE_URL + "/leagues?country=" + country;

    ApiFootballLeagueResponse response = restClient.get()
        .uri(uri)
        .headers(h -> h.addAll(createHeaders()))
        .retrieve()
        .body(ApiFootballLeagueResponse.class);

    if (response == null || response.getResponse() == null) {
      return new ArrayList<>();
    }

    return response.getResponse().stream()
        .map(item -> com.bolao.fixture.entities.League.builder()
            .id(item.getLeague().getId())
            .name(item.getLeague().getName())
            .logo(item.getLeague().getLogo())
            .country(item.getCountry() != null ? item.getCountry().getName() : null)
            .build())
        .toList();
  }

  private HttpHeaders createHeaders() {
    HttpHeaders headers = new HttpHeaders();
    headers.set("x-apisports-key", apiKey);
    return headers;
  }
}
