package com.bolao.fixture;

import com.bolao.fixture.entities.League;
import com.bolao.round.entities.Match;
import java.util.List;

public interface ExternalMatchProvider {
  List<Match> fetchMatchesByRound(int leagueId, int season, String externalRoundId);

  List<String> fetchAvailableRounds(int leagueId, int season);

  String getChampionshipName(int leagueId);

  String getChampionshipLogo(int leagueId);

  List<League> fetchLeagues(String country);
}
