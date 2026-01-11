package com.bolao.fixture;

import com.bolao.fixture.dtos.FootballDataCompetitionResponse;
import com.bolao.fixture.dtos.FootballDataMatchResponse;
import com.bolao.fixture.entities.League;
import com.bolao.round.entities.Match;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Slf4j
@Service
@Primary
@RequiredArgsConstructor
public class FootballDataProvider implements ExternalMatchProvider {

  private final RestClient restClient;

  @Value("${api.football.key}")
  private String apiKey;

  private static final String BASE_URL = "https://api.football-data.org/v4";

  @Override
  public List<Match> fetchMatchesByRound(int leagueId, int season, String externalRoundId) {
    log.info("Fetching matches for league {}, season {}, matchday {}", leagueId, season, externalRoundId);

    String code = getCompetitionCode(leagueId);
    String url = BASE_URL + "/competitions/" + code + "/matches?matchday=" + externalRoundId + "&season=" + season;

    FootballDataMatchResponse response = restClient.get()
        .uri(url)
        .headers(this::setAuthHeaders)
        .retrieve()
        .body(FootballDataMatchResponse.class);

    return response != null ? response.toDomainMatches() : new ArrayList<>();
  }

  @Override
  public List<String> fetchAvailableRounds(int leagueId, int season) {
    log.info("Fetching available rounds for league {}, season {}", leagueId, season);

    String code = getCompetitionCode(leagueId);
    String url = BASE_URL + "/competitions/" + code + "/matches?season=" + season;

    FootballDataMatchResponse response = restClient.get()
        .uri(url)
        .headers(this::setAuthHeaders)
        .retrieve()
        .body(FootballDataMatchResponse.class);

    if (response == null || response.getMatches() == null) {
      return new ArrayList<>();
    }

    int maxMatchday = response.getMatches().stream()
        .mapToInt(FootballDataMatchResponse.MatchData::getMatchday)
        .max()
        .orElse(0);

    return IntStream.rangeClosed(1, maxMatchday)
        .mapToObj(String::valueOf)
        .toList();
  }

  @Override
  public String getChampionshipName(int leagueId) {
    FootballDataCompetitionResponse.CompetitionData competition = fetchCompetition(leagueId);
    return competition != null ? competition.getName() : "Unknown";
  }

  @Override
  public String getChampionshipLogo(int leagueId) {
    FootballDataCompetitionResponse.CompetitionData competition = fetchCompetition(leagueId);
    return competition != null ? competition.getEmblem() : null;
  }

  @Override
  public List<League> fetchLeagues(String country) {
    log.info("Fetching leagues for: {}", country);

    String url = BASE_URL + "/competitions";

    FootballDataCompetitionResponse response = restClient.get()
        .uri(url)
        .headers(this::setAuthHeaders)
        .retrieve()
        .body(FootballDataCompetitionResponse.class);

    if (response == null) {
      return new ArrayList<>();
    }

    List<League> all = response.toDomainLeagues();

    if (country == null || country.isBlank()) {
      return all;
    }

    return all.stream()
        .filter(l -> l.getCountry() != null && l.getCountry().equalsIgnoreCase(country))
        .toList();
  }

  private FootballDataCompetitionResponse.CompetitionData fetchCompetition(int leagueId) {
    String code = getCompetitionCode(leagueId);
    String url = BASE_URL + "/competitions/" + code;

    try {
      FootballDataCompetitionResponse response = restClient.get()
          .uri(url)
          .headers(this::setAuthHeaders)
          .retrieve()
          .body(FootballDataCompetitionResponse.class);

      if (response != null && response.getCompetitions() != null && !response.getCompetitions().isEmpty()) {
        return response.getCompetitions().get(0);
      }
    } catch (Exception e) {
      log.error("Error fetching competition {}: {}", leagueId, e.getMessage());
    }
    return null;
  }

  private String getCompetitionCode(int leagueId) {
    return switch (leagueId) {
      case 2013 -> "BSA"; // Brasileirão Série A
      case 2029 -> "BSB"; // Brasileirão Série B
      case 2037 -> "CDB"; // Copa do Brasil
      case 2021 -> "PL"; // Premier League
      case 2014 -> "PD"; // La Liga
      case 2002 -> "BL1"; // Bundesliga
      case 2019 -> "SA"; // Serie A (Italy)
      case 2015 -> "FL1"; // Ligue 1
      case 2003 -> "DED"; // Eredivisie
      case 2017 -> "PPL"; // Primeira Liga
      case 2001 -> "CL"; // Champions League
      default -> String.valueOf(leagueId);
    };
  }

  private void setAuthHeaders(HttpHeaders headers) {
    headers.set("X-Auth-Token", apiKey);
  }
}
