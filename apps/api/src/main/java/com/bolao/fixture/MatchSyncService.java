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

@Service
@Slf4j
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
    MatchResponseWrapper wrapper = matchProvider.fetchAllMatchesForSeason(leagueId, season);
    List<Match> allMatches = wrapper.getMatches();

    if (allMatches.isEmpty()) {
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
        .status(determineRoundStatus(roundMatches))
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
    round.setStartDate(findEarliestKickoff(roundMatches));
    round.setEndDate(calculateRoundEndDate(roundMatches, details));

    if (round.getTicketPrice() == null || round.getTicketPrice() == 10.0) {
      round.setTicketPrice(RoundPricingService.STANDARD_PRICE);
    }

    if (round.getStatus() != Round.Status.CALCULATED && round.getStatus() != Round.Status.CANCELLED) {
      round.setStatus(determineRoundStatus(roundMatches));
    }

    Round savedRound = roundRepository.save(round);

    updateMatches(roundMatches, savedRound.getId());
    return savedRound;
  }

  private void saveMatches(List<Match> matches, Long roundId) {
    for (Match match : matches) {
      match.setRoundId(roundId);
      match.setEstimatedEndTime(match.getKickoffTime() != null ? match.getKickoffTime().plusMinutes(105) : null);
      matchRepository.save(match);
    }
  }

  private void updateMatches(List<Match> roundMatches, Long roundId) {
    for (Match externalMatch : roundMatches) {
      log.info("Processing match from external API: ID={}, HomeScore={}, AwayScore={}, Status={}",
          externalMatch.getExternalMatchId(), externalMatch.getHomeScore(), externalMatch.getAwayScore(),
          externalMatch.getStatus());

      Match existingMatch = matchRepository.findByExternalMatchId(externalMatch.getExternalMatchId()).orElse(null);

      if (existingMatch == null) {
        log.info("New match found, saving: {}", externalMatch.getExternalMatchId());
        externalMatch.setRoundId(roundId);
        externalMatch.setEstimatedEndTime(
            externalMatch.getKickoffTime() != null ? externalMatch.getKickoffTime().plusMinutes(105) : null);
        matchRepository.save(externalMatch);
        continue;
      }

      log.info("Existing match found, updating: {}. Old Score: {}x{}, New Score: {}x{}",
          existingMatch.getExternalMatchId(), existingMatch.getHomeScore(), existingMatch.getAwayScore(),
          externalMatch.getHomeScore(), externalMatch.getAwayScore());

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

        LocalDateTime latestKickoff = findLatestKickoff(roundMatches);
        if (latestKickoff != null && latestKickoff.toLocalDate().isEqual(lastDate)) {
          return latestKickoff.plusMinutes(105);
        }
        return lastDate.atTime(23, 59);
      } catch (Exception e) {
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
  }

  private Round.Status determineRoundStatus(List<Match> matches) {
    if (matches.isEmpty()) {
      return Round.Status.SCHEDULED;
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

    // Find the earliest kickoff time
    LocalDateTime earliestKickoff = matches.stream()
        .map(Match::getKickoffTime)
        .filter(t -> t != null)
        .min(LocalDateTime::compareTo)
        .orElse(null);

    if (earliestKickoff != null) {
      LocalDateTime now = LocalDateTime.now();
      // If we are after kickoff, the round is LIVE (for betting purposes)
      if (now.isAfter(earliestKickoff)) {
        return Round.Status.LIVE;
      }
      // If we are within 2 days of kickoff, open the round
      if (now.isAfter(earliestKickoff.minusDays(2))) {
        return Round.Status.OPEN;
      }
    }

    return Round.Status.SCHEDULED;
  }

  private LocalDateTime findLatestKickoff(List<Match> matches) {
    return matches.stream()
        .map(Match::getKickoffTime)
        .filter(t -> t != null)
        .max(LocalDateTime::compareTo)
        .orElse(null);
  }

  private LocalDateTime findEarliestKickoff(List<Match> matches) {
    return matches.stream()
        .map(Match::getKickoffTime)
        .filter(t -> t != null)
        .min(LocalDateTime::compareTo)
        .orElse(null);
  }
}
