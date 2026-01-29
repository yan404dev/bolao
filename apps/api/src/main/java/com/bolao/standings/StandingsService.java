package com.bolao.standings;

import com.bolao.round.entities.Match;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.standings.dtos.StandingDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StandingsService {

  private final MatchRepository matchRepository;

  public List<StandingDto> calculateStandings() {
    List<Match> finishedMatches = matchRepository.findAll().stream()
        .filter(Match::isFinished)
        .collect(Collectors.toList());

    Map<String, TeamStats> statsMap = new HashMap<>();

    for (Match match : finishedMatches) {
      updateStats(statsMap, match.getHomeTeam(), match.getHomeTeamLogo(), match.getHomeScore(), match.getAwayScore());
      updateStats(statsMap, match.getAwayTeam(), match.getAwayTeamLogo(), match.getAwayScore(), match.getHomeScore());
    }

    List<StandingDto> standings = statsMap.entrySet().stream()
        .map(entry -> {
          TeamStats stats = entry.getValue();
          return StandingDto.builder()
              .teamName(entry.getKey())
              .teamLogo(stats.logo)
              .points(stats.points)
              .played(stats.played)
              .won(stats.won)
              .drawn(stats.drawn)
              .lost(stats.lost)
              .goalsFor(stats.goalsFor)
              .goalsAgainst(stats.goalsAgainst)
              .goalDifference(stats.goalsFor - stats.goalsAgainst)
              .build();
        })
        .sorted(Comparator.comparing(StandingDto::getPoints, Comparator.reverseOrder())
            .thenComparing(StandingDto::getWon, Comparator.reverseOrder())
            .thenComparing(StandingDto::getGoalDifference, Comparator.reverseOrder())
            .thenComparing(StandingDto::getGoalsFor, Comparator.reverseOrder()))
        .collect(Collectors.toList());

    for (int i = 0; i < standings.size(); i++) {
      standings.get(i).setPosition(i + 1);
    }

    return standings;
  }

  private void updateStats(Map<String, TeamStats> statsMap, String teamName, String logo, Integer goalsFor,
      Integer goalsAgainst) {
    if (teamName == null || goalsFor == null || goalsAgainst == null)
      return;

    TeamStats stats = statsMap.computeIfAbsent(teamName, k -> new TeamStats(logo));
    stats.played++;
    stats.goalsFor += goalsFor;
    stats.goalsAgainst += goalsAgainst;

    if (goalsFor > goalsAgainst) {
      stats.points += 3;
      stats.won++;
    } else if (goalsFor.equals(goalsAgainst)) {
      stats.points += 1;
      stats.drawn++;
    } else {
      stats.lost++;
    }
  }

  private static class TeamStats {
    String logo;
    int points = 0;
    int played = 0;
    int won = 0;
    int drawn = 0;
    int lost = 0;
    int goalsFor = 0;
    int goalsAgainst = 0;

    TeamStats(String logo) {
      this.logo = logo;
    }
  }
}
