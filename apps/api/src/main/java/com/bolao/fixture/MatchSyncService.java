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
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MatchSyncService {

  private final ScraperMatchProvider scraperProvider;
  private final MatchRepository matchRepository;
  private final RoundRepository roundRepository;

  public List<Match> fetchAndSyncMatches(Long roundId, String externalRoundId) {
    log.info("Requesting match sync for external round: {} (local id: {})", externalRoundId, roundId);

    List<Match> externalMatches = scraperProvider.fetchMatchesByRound(externalRoundId);

    if (roundId != null && !externalMatches.isEmpty()) {
      for (Match match : externalMatches) {
        match.setRoundId(roundId);
        matchRepository.save(match);
      }
    }

    return externalMatches;
  }

  @Transactional
  public void seedRoundsFromScraper() {
    log.info("Starting database seed from scraper fixtures...");
    List<String> availableRounds = scraperProvider.fetchAvailableRounds();

    for (String extId : availableRounds) {
      if (roundRepository.findByExternalRoundId(extId).isPresent()) {
        log.debug("Round {} already exists in DB, skipping seed", extId);
        continue;
      }

      log.info("Seeding Round {} from scraper...", extId);
      List<Match> matches = scraperProvider.fetchMatchesByRound(extId);

      if (matches.isEmpty())
        continue;

      Round round = Round.builder()
          .title("Brasileirão 2026 - Rodada " + extId)
          .externalRoundId(extId)
          .status(Round.Status.OPEN)
          .prizePool(0.0)
          .totalTickets(0)
          .ticketPrice(10.0)
          .startDate(LocalDateTime.now())
          .createdAt(LocalDateTime.now())
          .build();

      round = roundRepository.save(round);

      for (Match match : matches) {
        match.setRoundId(round.getId());
        matchRepository.save(match);
      }
      log.info("Round {} and {} matches successfully seeded", extId, matches.size());
    }
  }

  public List<String> fetchAvailableRounds() {
    return scraperProvider.fetchAvailableRounds();
  }

  public void syncLiveScores() {
    log.info("Live scores sync skipped (no providers configured)");
  }
}
