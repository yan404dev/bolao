package com.bolao.round.usecases;

import com.bolao.fixture.MatchSyncService;
import com.bolao.round.entities.Match;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.round.repositories.RoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CreateRoundUseCase {

  private final RoundRepository roundRepository;
  private final MatchRepository matchRepository;
  private final MatchSyncService matchSyncService;

  @Value("${api.football.league.id:39}")
  private int defaultLeagueId;

  @Value("${api.football.season:2026}")
  private int defaultSeason;

  @Transactional
  public Round execute(String title, String externalRoundId, Double ticketPrice, Integer leagueId, Integer season) {
    int targetLeagueId = leagueId != null ? leagueId : defaultLeagueId;
    int targetSeason = season != null ? season : defaultSeason;

    List<Match> matches = matchSyncService.fetchAndSyncMatches(targetLeagueId, targetSeason, null, externalRoundId);

    if (matches.isEmpty()) {
      throw new IllegalArgumentException("No matches found for round: " + externalRoundId);
    }

    Round round = Round.builder()
        .title(title)
        .externalRoundId(externalRoundId)
        .externalLeagueId(targetLeagueId)
        .externalSeason(targetSeason)
        .status(Round.Status.OPEN)
        .prizePool(0.0)
        .totalTickets(0)
        .ticketPrice(ticketPrice)
        .startDate(matches.get(0).getKickoffTime())
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
}
