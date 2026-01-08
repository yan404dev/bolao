package com.bolao.fixture;

import com.bolao.fixture.dtos.MatchDto;
import com.bolao.round.entities.Match;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
@RequiredArgsConstructor
public class MatchApiClient {

  private static final Set<String> LIVE_STATUSES = Set.of("1T", "2T", "LIVE", "INT");

  private final RestClient footballApiClient;

  @Value("${football.api.hostname:https://www.bolaojogadacerta.top}")
  private String hostname;

  public List<Match> fetchByRoundId(String roundId) {
    log.info("Fetching matches for round: {}", roundId);

    return fetchFromApi(roundId)
        .map(this::mapToMatches)
        .orElse(Collections.emptyList());
  }

  private Optional<List<MatchDto>> fetchFromApi(String roundId) {
    try {
      var response = footballApiClient.get()
          .uri("/jogos/{roundId}?_type=get&hostname={host}", roundId, hostname)
          .retrieve()
          .body(new ParameterizedTypeReference<List<MatchDto>>() {
          });

      return Optional.ofNullable(response).filter(list -> !list.isEmpty());
    } catch (Exception e) {
      log.error("Failed to fetch matches for round {}: {}", roundId, e.getMessage());
      return Optional.empty();
    }
  }

  private List<Match> mapToMatches(List<MatchDto> matches) {
    log.info("Mapping {} matches", matches.size());
    return matches.stream().map(this::toMatch).toList();
  }

  private Match toMatch(MatchDto match) {
    return Match.builder()
        .id(generateId(match.getExternalId()))
        .homeTeam(match.getHomeTeamName())
        .homeTeamLogo(match.getHomeTeamLogo())
        .homeScore(match.getHomeGoals())
        .awayTeam(match.getAwayTeamName())
        .awayTeamLogo(match.getAwayTeamLogo())
        .awayScore(match.getAwayGoals())
        .kickoffTime(parseDateTime(match.getDateTime()))
        .status(mapStatus(match))
        .build();
  }

  private long generateId(String externalId) {
    return externalId != null
        ? externalId.hashCode() & 0xFFFFFFFFL
        : System.currentTimeMillis();
  }

  private LocalDateTime parseDateTime(String dateTime) {
    if (dateTime == null) {
      return null;
    }

    try {
      return OffsetDateTime.parse(dateTime).toLocalDateTime();
    } catch (Exception e) {
      log.warn("Invalid date format: {}", dateTime);
      return null;
    }
  }

  private Match.Status mapStatus(MatchDto match) {
    if (match.isFinished()) {
      return Match.Status.FINISHED;
    }
    if (isLive(match.getStatus())) {
      return Match.Status.LIVE;
    }
    return Match.Status.SCHEDULED;
  }

  private boolean isLive(String status) {
    return status != null && LIVE_STATUSES.stream()
        .anyMatch(s -> status.toUpperCase().contains(s));
  }
}
