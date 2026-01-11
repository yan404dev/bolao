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
    log.info("Starting database sync for league {} season {} from external provider...", leagueId, season);
    List<String> availableRounds = matchProvider.fetchAvailableRounds(leagueId, season);
    List<Round> syncedRounds = new ArrayList<>();

    String champName = matchProvider.getChampionshipName(leagueId);
    String champLogo = matchProvider.getChampionshipLogo(leagueId);

    for (String extId : availableRounds) {
      if (roundRepository.findByExternalRoundId(extId).isPresent()) {
        log.debug("Round {} already exists in DB, skipping seed", extId);
        continue;
      }

      log.info("Seeding Round {} from provider...", extId);
      List<Match> matches = matchProvider.fetchMatchesByRound(leagueId, season, extId);

      if (matches.isEmpty())
        continue;

      Round.Status roundStatus = determineRoundStatus(matches);

      double ticketPrice = pricingService.calculateInitialTicketPrice(matches.get(0).getKickoffTime());

      Round round = Round.builder()
          .title(champName + " - " + extId)
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
      log.info("Round {} and {} matches successfully seeded", extId, matches.size());
      syncedRounds.add(round);
    }
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
