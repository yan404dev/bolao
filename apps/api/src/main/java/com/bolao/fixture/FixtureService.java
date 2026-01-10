package com.bolao.fixture;

import com.bolao.round.entities.Match;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FixtureService {

  private final MatchSyncService matchSyncService;

  public List<Match> getFixtures(String roundId) {
    return matchSyncService.fetchAndSyncMatches(null, roundId);

  }
}
