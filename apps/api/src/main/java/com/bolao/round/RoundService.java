package com.bolao.round;

import com.bolao.fixture.MatchSyncService;
import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Match;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.round.services.RoundRankingService;
import com.bolao.round.services.RoundScoringService;
import com.bolao.round.services.RoundStatsService;
import com.bolao.shared.entities.ResultEntity;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoundService {

  private final RoundRepository roundRepository;
  private final MatchRepository matchRepository;
  private final MatchSyncService matchSyncService;
  private final RoundScoringService scoringService;
  private final RoundStatsService statsService;
  private final RoundRankingService rankingService;

  @EventListener(ApplicationReadyEvent.class)
  @Async
  public void onStartup() {
    log.info("System startup: Triggering matches sync from provider...");
    matchSyncService.syncAllRounds();
  }

  public List<Round> syncAllRounds() {
    return matchSyncService.syncAllRounds();
  }

  @Transactional
  public Round create(String title, String externalRoundId, Double ticketPrice) {
    List<Match> matches = matchSyncService.fetchAndSyncMatches(null, externalRoundId);

    if (matches.isEmpty()) {
      throw new IllegalArgumentException("No matches found for round: " + externalRoundId);
    }

    Round round = Round.builder()
        .title(title)
        .externalRoundId(externalRoundId)
        .status(Round.Status.OPEN)
        .prizePool(0.0)
        .totalTickets(0)
        .ticketPrice(ticketPrice)
        .startDate(LocalDateTime.now())
        .createdAt(LocalDateTime.now())
        .build();

    round = roundRepository.save(round);

    for (Match match : matches) {
      match.setRoundId(round.getId());
      matchRepository.save(match);
    }

    round.setMatches(matches);
    return round;
  }

  @Transactional(readOnly = true)
  public List<Round> findAll(Round.Status status) {
    if (status == null) {
      return loadMatchesForAll(roundRepository.findAll());
    }
    return loadMatchesForAll(roundRepository.findByStatus(status));
  }

  @Transactional(readOnly = true)
  public List<String> getExternalCalendar() {
    return matchSyncService.fetchAvailableRounds();
  }

  @Transactional(readOnly = true)
  public Round findById(Long id) {
    Round round = roundRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Round not found: " + id));
    loadMatches(round);
    return round;
  }

  @Transactional(readOnly = true)
  public ResultEntity<RankingDto> getRanking(Long roundId, String search, Integer minPoints, Pageable pageable) {
    return rankingService.getRanking(roundId, search, minPoints, pageable);
  }

  @Transactional
  public void calculateScores(Long roundId, String externalRoundId) {
    List<Match> matches = matchSyncService.fetchAndSyncMatches(roundId, externalRoundId);
    scoringService.calculateScores(roundId, matches);
  }

  @Transactional
  public void updateRoundStats(Long roundId) {
    statsService.updateRoundStats(roundId);
  }

  private List<Round> loadMatchesForAll(List<Round> rounds) {
    rounds.forEach(this::loadMatches);
    return rounds;
  }

  private void loadMatches(Round round) {
    List<Match> matches = matchRepository.findByRoundId(round.getId());
    round.setMatches(matches);
  }
}
