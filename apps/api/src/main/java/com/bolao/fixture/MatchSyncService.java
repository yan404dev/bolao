package com.bolao.fixture;

import com.bolao.fixture.dtos.MatchResponseWrapper;
import com.bolao.round.entities.Match;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.round.services.RoundPricingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MatchSyncService {

  private final ExternalMatchProvider matchProvider;
  private final MatchRepository matchRepository;
  private final RoundRepository roundRepository;
  private final RoundPricingService pricingService;

  public List<Match> fetchAndSyncMatches(int leagueId, int season, Long roundId, String externalRoundId) {

    List<Match> externalMatches = matchProvider.fetchMatchesByRound(leagueId, season, externalRoundId);

    if (roundId != null && !externalMatches.isEmpty()) {
      for (Match match : externalMatches) {
        match.setRoundId(roundId);
        matchRepository.save(match);
      }
    }

    return externalMatches;
  }

  @Transactional
  public List<Round> syncAllRounds(int leagueId, int season) {
    log.info("Starting smart sync for league {} season {}...", leagueId, season);

    MatchResponseWrapper wrapper = matchProvider.fetchAllMatchesForSeason(leagueId, season);
    List<Match> allMatches = wrapper.getMatches();

    if (allMatches.isEmpty()) {
      log.warn("No matches returned from provider for league {} season {}", leagueId, season);
      return new ArrayList<>();
    }

    String champName = wrapper.getChampionshipName();
    String champLogo = wrapper.getChampionshipLogo();

    Map<String, List<Match>> matchesByRound = allMatches.stream()
        .filter(m -> m.getExternalRoundId() != null)
        .collect(Collectors.groupingBy(Match::getExternalRoundId));

    List<Round> syncedRounds = new ArrayList<>();
    var roundDetailsMap = wrapper.getRoundDetails() != null
        ? wrapper.getRoundDetails().stream()
            .collect(Collectors.toMap(com.bolao.fixture.entities.RoundDetails::getName, rd -> rd))
        : Map.of();

    for (var entry : matchesByRound.entrySet()) {
      var details = (com.bolao.fixture.entities.RoundDetails) roundDetailsMap.get(entry.getKey());
      syncedRounds.add(processRound(entry.getKey(), entry.getValue(), leagueId, season, champName, champLogo, details));
    }

    log.info("Smart Sync complete: {} rounds processed", syncedRounds.size());
    return syncedRounds;
  }

  private Round processRound(String extRoundId, List<Match> roundMatches, int leagueId, int season, String champName,
      String champLogo, com.bolao.fixture.entities.RoundDetails details) {
    Round round = roundRepository.findByExternalRoundId(extRoundId).orElse(null);

    if (round == null) {
      return createNewRound(extRoundId, roundMatches, leagueId, season, champName, champLogo, details);
    }

    return updateExistingRound(round, roundMatches, champName, champLogo, details);
  }

  private Round createNewRound(String extRoundId, List<Match> roundMatches, int leagueId, int season, String champName,
      String champLogo, com.bolao.fixture.entities.RoundDetails details) {
    double ticketPrice = pricingService.calculateInitialTicketPrice(roundMatches.get(0).getKickoffTime());

    Round round = Round.builder()
        .title(champName + " - Rodada " + extRoundId)
        .externalRoundId(extRoundId)
        .externalLeagueId(leagueId)
        .externalSeason(season)
        .championshipTitle(champName)
        .championshipLogo(champLogo)
        .status(Round.Status.CLOSED)
        .prizePool(0.0)
        .totalTickets(0)
        .ticketPrice(ticketPrice)
        .startDate(roundMatches.get(0).getKickoffTime())
        .endDate(calculateRoundEndDate(roundMatches, details))
        .createdAt(LocalDateTime.now())
        .build();

    round = roundRepository.save(round);
    saveMatches(roundMatches, round.getId());
    return round;
  }

  private Round updateExistingRound(Round round, List<Match> roundMatches, String champName, String champLogo,
      com.bolao.fixture.entities.RoundDetails details) {

    round.setChampionshipTitle(champName);
    round.setChampionshipLogo(champLogo);
    round.setTitle(champName + " - Rodada " + round.getExternalRoundId());
    round.setEndDate(calculateRoundEndDate(roundMatches, details));
    Round savedRound = roundRepository.save(round);

    updateMatches(roundMatches);
    return savedRound;
  }

  private void saveMatches(List<Match> matches, Long roundId) {
    for (Match match : matches) {
      match.setRoundId(roundId);
      match.setEstimatedEndTime(match.getKickoffTime() != null ? match.getKickoffTime().plusMinutes(105) : null);
      matchRepository.save(match);
    }
  }

  private void updateMatches(List<Match> roundMatches) {
    for (Match externalMatch : roundMatches) {
      Match existingMatch = matchRepository.findByExternalMatchId(externalMatch.getExternalMatchId()).orElse(null);

      if (existingMatch == null) {
        matchRepository.save(externalMatch);
        continue;
      }

      existingMatch.setHomeScore(externalMatch.getHomeScore());
      existingMatch.setAwayScore(externalMatch.getAwayScore());
      existingMatch.setStatus(externalMatch.getStatus());
      existingMatch.setKickoffTime(externalMatch.getKickoffTime());
      existingMatch.setEstimatedEndTime(
          externalMatch.getKickoffTime() != null ? externalMatch.getKickoffTime().plusMinutes(105) : null);
      matchRepository.save(existingMatch);
    }
  }

  private LocalDateTime calculateRoundEndDate(List<Match> roundMatches,
      com.bolao.fixture.entities.RoundDetails details) {
    if (details != null && details.getDates() != null && !details.getDates().isEmpty()) {
      try {
        String lastDateStr = details.getDates().get(details.getDates().size() - 1);
        LocalDate lastDate = LocalDate.parse(lastDateStr);
        // We'll set it to the end of that day as a fallback or the latest match time if
        // it's on that day
        LocalDateTime latestKickoff = findLatestKickoff(roundMatches);
        if (latestKickoff != null && latestKickoff.toLocalDate().isEqual(lastDate)) {
          return latestKickoff.plusMinutes(105);
        }
        return lastDate.atTime(23, 59);
      } catch (Exception e) {
        log.warn("Error parsing round dates: {}", e.getMessage());
      }
    }
    LocalDateTime latest = findLatestKickoff(roundMatches);
    return latest != null ? latest.plusMinutes(105) : null;
  }

  public List<String> fetchAvailableRounds(int leagueId, int season) {
    return matchProvider.fetchAvailableRounds(leagueId, season).stream()
        .map(com.bolao.fixture.entities.RoundDetails::getName)
        .toList();
  }

  public void syncLiveScores() {
    log.info("Live scores sync skipped (no providers configured)");
  }

  private Round.Status determineRoundStatus(List<Match> matches) {
    if (matches.isEmpty()) {
      return Round.Status.OPEN;
    }

    boolean allFinished = matches.stream()
        .allMatch(m -> m.getStatus() == Match.Status.FINISHED);
    if (allFinished) {
      return Round.Status.CLOSED;
    }

    boolean anyLive = matches.stream()
        .anyMatch(m -> m.getStatus() == Match.Status.LIVE);
    if (anyLive) {
      return Round.Status.LIVE;
    }

    return Round.Status.OPEN;
  }

  private LocalDateTime findLatestKickoff(List<Match> matches) {
    return matches.stream()
        .map(Match::getKickoffTime)
        .filter(t -> t != null)
        .max(LocalDateTime::compareTo)
        .orElse(null);
  }
}
