package com.bolao.fixture;

import com.bolao.round.entities.Match;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.round.repositories.RoundRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.bolao.round.services.RoundPricingService;

@Slf4j
@Service
@RequiredArgsConstructor
public class MatchSyncService {

  private final ExternalMatchProvider matchProvider;
  private final MatchRepository matchRepository;
  private final RoundRepository roundRepository;
  private final RoundPricingService pricingService;

  public List<Match> fetchAndSyncMatches(int leagueId, int season, Long roundId, String externalRoundId) {
    log.info("Requesting match sync for external round: {} (local id: {})", externalRoundId, roundId);

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
    log.info("Starting optimized sync for league {} season {} (single API call)...", leagueId, season);

    List<Match> allMatches = matchProvider.fetchAllMatchesForSeason(leagueId, season);
    if (allMatches.isEmpty()) {
      log.warn("No matches returned from provider for league {} season {}", leagueId, season);
      return new ArrayList<>();
    }

    String champName = matchProvider.getChampionshipName(leagueId);
    String champLogo = matchProvider.getChampionshipLogo(leagueId);

    java.util.Map<String, List<Match>> matchesByRound = allMatches.stream()
        .filter(m -> m.getExternalRoundId() != null)
        .collect(java.util.stream.Collectors.groupingBy(Match::getExternalRoundId));

    List<Round> syncedRounds = new ArrayList<>();

    for (var entry : matchesByRound.entrySet()) {
      String extId = entry.getKey();
      List<Match> matches = entry.getValue();

      if (roundRepository.findByExternalRoundId(extId).isPresent()) {
        log.debug("Round {} already exists in DB, skipping", extId);
        continue;
      }

      log.info("Seeding Round {} with {} matches...", extId, matches.size());

      Round.Status roundStatus = Round.Status.CLOSED; // Default to CLOSED for manual control
      double ticketPrice = pricingService.calculateInitialTicketPrice(matches.get(0).getKickoffTime());

      Round round = Round.builder()
          .title(champName + " - Rodada " + extId)
          .externalRoundId(extId)
          .externalLeagueId(leagueId)
          .externalSeason(season)
          .championshipTitle(champName)
          .championshipLogo(champLogo)
          .status(roundStatus)
          .prizePool(0.0)
          .totalTickets(0)
          .ticketPrice(ticketPrice)
          .startDate(matches.get(0).getKickoffTime())
          .endDate(findLatestKickoff(matches))
          .createdAt(LocalDateTime.now())
          .build();

      round = roundRepository.save(round);

      for (Match match : matches) {
        match.setRoundId(round.getId());
        matchRepository.save(match);
      }
      syncedRounds.add(round);
    }

    log.info("Sync complete: {} rounds seeded from {} total matches", syncedRounds.size(), allMatches.size());
    return syncedRounds;
  }

  public List<String> fetchAvailableRounds(int leagueId, int season) {
    return matchProvider.fetchAvailableRounds(leagueId, season);
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
