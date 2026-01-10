package com.bolao.fixture;

import com.bolao.round.entities.Match;
import java.util.List;

public interface ExternalMatchProvider {

    List<Match> fetchMatchesByRound(String externalRoundId);

    List<Match> fetchLiveScores();

    String getProviderName();

    List<String> fetchAvailableRounds();
}
