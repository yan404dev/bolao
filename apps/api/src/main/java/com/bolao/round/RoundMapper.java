package com.bolao.round;

import com.bolao.round.entities.Match;
import com.bolao.round.entities.MatchEntity;
import com.bolao.round.entities.Round;
import com.bolao.round.entities.RoundEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RoundMapper {

  public Round toDomain(RoundEntity entity) {
    List<Match> matches = entity.getMatches().stream()
        .map(this::toMatchDomain)
        .toList();

    return Round.builder()
        .id(entity.getId())
        .title(entity.getTitle())
        .externalRoundId(entity.getExternalRoundId())
        .status(Round.Status.valueOf(entity.getStatus().name()))
        .startDate(entity.getStartDate())
        .endDate(entity.getEndDate())
        .totalTickets(entity.getTotalTickets())
        .prizePool(entity.getPrizePool())
        .ticketPrice(entity.getTicketPrice())
        .createdAt(entity.getCreatedAt())
        .championshipTitle(entity.getChampionshipTitle())
        .championshipLogo(entity.getChampionshipLogo())
        .matches(matches)
        .build();
  }

  public Match toMatchDomain(MatchEntity entity) {
    return Match.builder()
        .id(entity.getId())
        .roundId(entity.getRound() != null ? entity.getRound().getId() : null)
        .homeTeam(entity.getHomeTeam())
        .homeTeamLogo(entity.getHomeTeamLogo())
        .homeScore(entity.getHomeScore())
        .awayTeam(entity.getAwayTeam())
        .awayTeamLogo(entity.getAwayTeamLogo())
        .awayScore(entity.getAwayScore())
        .kickoffTime(entity.getKickoffTime())
        .status(Match.Status.valueOf(entity.getStatus().name()))
        .build();
  }

  public RoundEntity toEntity(Round round) {
    return RoundEntity.builder()
        .id(round.getId())
        .title(round.getTitle())
        .externalRoundId(round.getExternalRoundId())
        .status(RoundEntity.Status.valueOf(round.getStatus().name()))
        .startDate(round.getStartDate())
        .endDate(round.getEndDate())
        .totalTickets(round.getTotalTickets())
        .prizePool(round.getPrizePool())
        .ticketPrice(round.getTicketPrice())
        .createdAt(round.getCreatedAt())
        .championshipTitle(round.getChampionshipTitle())
        .championshipLogo(round.getChampionshipLogo())
        .build();
  }

  public MatchEntity toMatchEntity(Match match, RoundEntity round) {
    return MatchEntity.builder()
        .id(match.getId())
        .round(round)
        .homeTeam(match.getHomeTeam())
        .homeTeamLogo(match.getHomeTeamLogo())
        .homeScore(match.getHomeScore())
        .awayTeam(match.getAwayTeam())
        .awayTeamLogo(match.getAwayTeamLogo())
        .awayScore(match.getAwayScore())
        .kickoffTime(match.getKickoffTime())
        .status(MatchEntity.Status.valueOf(match.getStatus().name()))
        .build();
  }
}
