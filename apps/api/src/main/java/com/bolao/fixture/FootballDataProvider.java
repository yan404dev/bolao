package com.bolao.fixture;

import com.bolao.fixture.dtos.FootballDataCompetitionResponse;
import com.bolao.fixture.dtos.FootballDataMatchResponse;
import com.bolao.fixture.dtos.MatchResponseWrapper;
import com.bolao.fixture.entities.League;
import com.bolao.round.entities.Match;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

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
  public MatchResponseWrapper fetchAllMatchesForSeason(int leagueId, int season) {
    String code = getCompetitionCode(leagueId);
    String url = BASE_URL + "/competitions/" + code + "/matches?season=" + season;

    FootballDataMatchResponse response = restClient.get()
        .uri(url)
        .headers(this::setAuthHeaders)
        .retrieve()
        .body(FootballDataMatchResponse.class);

    if (response == null || response.getMatches() == null) {
      return MatchResponseWrapper.builder().matches(new ArrayList<>()).build();
    }

    String champName = response.getCompetition() != null ? response.getCompetition().getName() : "Unknown";
    if (champName == null || champName.equals("Unknown")) {
      champName = getChampionshipName(leagueId);
    }

    String champLogo = response.getCompetition() != null ? response.getCompetition().getEmblem() : null;
    if (champLogo == null) {
      champLogo = getChampionshipLogo(leagueId);
    }

    List<Match> matches = response.getMatches().stream()
        .map(this::toMatchDomain)
        .toList();

    return MatchResponseWrapper.builder()
        .matches(matches)
        .championshipName(champName)
        .championshipLogo(champLogo)
        .roundDetails(fetchAvailableRounds(leagueId, season))
        .build();
  }

  private Match toMatchDomain(FootballDataMatchResponse.MatchData data) {
    Match match = new Match();
    match.setHomeTeam(data.getHomeTeam() != null ? data.getHomeTeam().getName() : "TBD");
    match.setHomeTeamLogo(data.getHomeTeam() != null ? data.getHomeTeam().getCrest() : null);
    match.setAwayTeam(data.getAwayTeam() != null ? data.getAwayTeam().getName() : "TBD");
    match.setAwayTeamLogo(data.getAwayTeam() != null ? data.getAwayTeam().getCrest() : null);
    match.setKickoffTime(data.getUtcDate() != null ? data.getUtcDate().toLocalDateTime() : null);
    match.setExternalRoundId(String.valueOf(data.getMatchday()));
    match.setExternalMatchId(String.valueOf(data.getId()));
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

  @Override
  public List<com.bolao.fixture.entities.RoundDetails> fetchAvailableRounds(int leagueId, int season) {
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
        .mapToObj(i -> com.bolao.fixture.entities.RoundDetails.builder()
            .name(String.valueOf(i))
            .dates(new ArrayList<>())
            .build())
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
      FootballDataCompetitionResponse.CompetitionData response = restClient.get()
          .uri(url)
          .headers(this::setAuthHeaders)
          .retrieve()
          .body(FootballDataCompetitionResponse.CompetitionData.class);

      return response;
    } catch (Exception e) {
    }
    return null;
  }

  private String getCompetitionCode(int leagueId) {
    return switch (leagueId) {
      case 2013 -> "BSA";
      case 2029 -> "BSB";
      case 2037 -> "CDB";
      case 2021 -> "PL";
      case 2014 -> "PD";
      case 2002 -> "BL1";
      case 2019 -> "SA";
      case 2015 -> "FL1";
      case 2003 -> "DED";
      case 2017 -> "PPL";
      case 2001 -> "CL";
      default -> String.valueOf(leagueId);
    };
  }

  private void setAuthHeaders(HttpHeaders headers) {
    headers.set("X-Auth-Token", apiKey);
  }
}
