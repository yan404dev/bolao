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

@Slf4j
@Service
@RequiredArgsConstructor
public class MatchSyncService {

  private final ExternalMatchProvider matchProvider;
  private final MatchRepository matchRepository;
  private final RoundRepository roundRepository;

  public List<Match> fetchAndSyncMatches(Long roundId, String externalRoundId) {
    log.info("Requesting match sync for external round: {} (local id: {})", externalRoundId, roundId);

    List<Match> externalMatches = matchProvider.fetchMatchesByRound(externalRoundId);

    if (roundId != null && !externalMatches.isEmpty()) {
      for (Match match : externalMatches) {
        match.setRoundId(roundId);
        matchRepository.save(match);
      }
    }

    return externalMatches;
  }

  @Transactional
  public List<Round> syncAllRounds() {
    log.info("Starting database sync from external provider...");
    List<String> availableRounds = matchProvider.fetchAvailableRounds();
    List<Round> syncedRounds = new ArrayList<>();

    for (String extId : availableRounds) {
      if (roundRepository.findByExternalRoundId(extId).isPresent()) {
        log.debug("Round {} already exists in DB, skipping seed", extId);
        continue;
      }

      log.info("Seeding Round {} from provider...", extId);
      List<Match> matches = matchProvider.fetchMatchesByRound(extId);

      if (matches.isEmpty())
        continue;

      Round.Status roundStatus = determineRoundStatus(matches);

      Round round = Round.builder()
          .title(matchProvider.getChampionshipName() + " - " + extId)
          .externalRoundId(extId)
          .championshipTitle(matchProvider.getChampionshipName())
          .championshipLogo(matchProvider.getChampionshipLogo())
          .status(roundStatus)
          .prizePool(0.0)
          .totalTickets(0)
          .ticketPrice(10.0)
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

  public List<String> fetchAvailableRounds() {
    return matchProvider.fetchAvailableRounds();
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
