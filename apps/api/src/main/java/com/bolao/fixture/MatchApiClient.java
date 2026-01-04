package com.bolao.fixture;

import com.bolao.fixture.dtos.JogoDto;
import com.bolao.round.entities.Match;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Component
public class MatchApiClient {

  private static final String BASE_URL = "https://server-api.top/api";
  private static final String HOSTNAME = "https://www.bolaojogadacerta.top";
  private static final Set<String> LIVE_STATUSES = Set.of("1T", "2T", "LIVE", "INT");

  private final RestClient restClient;

  public MatchApiClient() {
    this.restClient = RestClient.builder()
        .baseUrl(BASE_URL)
        .build();
  }

  public List<Match> fetchByRoundId(String roundId) {
    log.info("Fetching matches for round: {}", roundId);

    return fetchFromApi(roundId)
        .map(this::mapToMatches)
        .orElse(Collections.emptyList());
  }

  private Optional<List<JogoDto>> fetchFromApi(String roundId) {
    try {
      var response = restClient.get()
          .uri("/jogos/{roundId}?_type=get&hostname={host}", roundId, HOSTNAME)
          .retrieve()
          .body(new ParameterizedTypeReference<List<JogoDto>>() {
          });

      return Optional.ofNullable(response).filter(list -> !list.isEmpty());
    } catch (Exception e) {
      log.error("Failed to fetch matches: {}", e.getMessage());
      return Optional.empty();
    }
  }

  private List<Match> mapToMatches(List<JogoDto> jogos) {
    log.info("Mapping {} matches", jogos.size());
    return jogos.stream().map(this::toMatch).toList();
  }

  private Match toMatch(JogoDto jogo) {
    return Match.builder()
        .id(generateId(jogo.getExternalId()))
        .homeTeam(jogo.getNomeCasa())
        .homeTeamLogo(jogo.getEscudoCasa())
        .homeScore(jogo.getGolsCasa())
        .awayTeam(jogo.getNomeVisitante())
        .awayTeamLogo(jogo.getEscudoVisitante())
        .awayScore(jogo.getGolsVisitante())
        .kickoffTime(parseDateTime(jogo.getDataHora()))
        .status(mapStatus(jogo))
        .build();
  }

  private long generateId(String externalId) {
    return externalId != null
        ? externalId.hashCode() & 0xFFFFFFFFL
        : System.currentTimeMillis();
  }

  private LocalDateTime parseDateTime(String dateTime) {
    if (dateTime == null)
      return null;

    try {
      return OffsetDateTime.parse(dateTime).toLocalDateTime();
    } catch (Exception e) {
      log.warn("Invalid date format: {}", dateTime);
      return null;
    }
  }

  private Match.Status mapStatus(JogoDto jogo) {
    if (jogo.isEncerrado())
      return Match.Status.FINISHED;
    if (isLive(jogo.getStatus()))
      return Match.Status.LIVE;
    return Match.Status.SCHEDULED;
  }

  private boolean isLive(String status) {
    return status != null && LIVE_STATUSES.stream()
        .anyMatch(s -> status.toUpperCase().contains(s));
  }
}
