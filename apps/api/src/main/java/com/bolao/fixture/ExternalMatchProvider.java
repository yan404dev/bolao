package com.bolao.fixture;

import com.bolao.round.entities.Match;
import java.util.List;

public interface ExternalMatchProvider {
  List<Match> fetchMatchesByRound(String externalRoundId);

  List<String> fetchAvailableRounds();

  String getChampionshipName();

  String getChampionshipLogo();
}
