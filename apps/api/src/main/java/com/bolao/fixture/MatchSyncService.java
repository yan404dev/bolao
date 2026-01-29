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
    reconcileMatches(roundMatches, round.getId());
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

    reconcileMatches(roundMatches, savedRound.getId());
    return savedRound;
  }

  private void reconcileMatches(List<Match> apiMatches, Long roundId) {
    List<Match> dbMatches = matchRepository.findByRoundId(roundId);
    java.util.Map<String, List<Match>> dbMatchesByExtId = dbMatches.stream()
        .filter(m -> m.getExternalMatchId() != null)
        .collect(java.util.stream.Collectors.groupingBy(Match::getExternalMatchId));

    for (Match apiMatch : apiMatches) {
      String extId = apiMatch.getExternalMatchId();
      if (extId == null)
        continue;

      List<Match> existing = dbMatchesByExtId.get(extId);

      if (existing == null || existing.isEmpty()) {
        log.info("Saving new match: {}", extId);
        apiMatch.setRoundId(roundId);
        apiMatch
            .setEstimatedEndTime(apiMatch.getKickoffTime() != null ? apiMatch.getKickoffTime().plusMinutes(105) : null);
        matchRepository.save(apiMatch);
      } else {
        // Update the first one found
        Match toUpdate = existing.get(0);
        log.info("Updating existing match: {}. Old Score: {}x{}, New Score: {}x{}",
            extId, toUpdate.getHomeScore(), toUpdate.getAwayScore(),
            apiMatch.getHomeScore(), apiMatch.getAwayScore());

        toUpdate.setHomeScore(apiMatch.getHomeScore());
        toUpdate.setAwayScore(apiMatch.getAwayScore());
        toUpdate.setStatus(apiMatch.getStatus());
        toUpdate.setKickoffTime(apiMatch.getKickoffTime());
        toUpdate
            .setEstimatedEndTime(apiMatch.getKickoffTime() != null ? apiMatch.getKickoffTime().plusMinutes(105) : null);
        matchRepository.save(toUpdate);

        // CLEANUP DUPLICATES: If there are more matches in DB with this external ID,
        // delete them!
        if (existing.size() > 1) {
          log.warn("Found {} duplicate matches for external ID {}. Cleaning up...", existing.size(), extId);
          for (int i = 1; i < existing.size(); i++) {
            matchRepository.delete(existing.get(i));
          }
        }
      }
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

  @Transactional
  public void deleteMatchesByRoundId(Long roundId) {
    List<Match> matches = matchRepository.findByRoundId(roundId);
    log.info("Found {} matches in round {}. Starting smart cleanup...", matches.size(), roundId);

    // Group matches by homeTeam + awayTeam to find duplicates
    java.util.Map<String, List<Match>> matchesByTeams = matches.stream()
        .collect(java.util.stream.Collectors.groupingBy(
            m -> m.getHomeTeam() + " vs " + m.getAwayTeam()));

    int deleted = 0;
    for (java.util.Map.Entry<String, List<Match>> entry : matchesByTeams.entrySet()) {
      List<Match> duplicates = entry.getValue();
      if (duplicates.size() > 1) {
        log.warn("Found {} duplicates for game: {}", duplicates.size(), entry.getKey());
        // Keep the first one (likely has predictions), delete the rest
        for (int i = 1; i < duplicates.size(); i++) {
          try {
            matchRepository.delete(duplicates.get(i));
            deleted++;
            log.info("Deleted duplicate match ID: {}", duplicates.get(i).getId());
          } catch (Exception e) {
            log.warn("Could not delete match {}: {}", duplicates.get(i).getId(), e.getMessage());
          }
        }
      }
    }
    log.info("Cleanup complete. Deleted {} duplicate matches.", deleted);
  }
}
