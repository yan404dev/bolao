package com.bolao.round.repositories;

import com.bolao.round.entities.Match;
import com.bolao.shared.repositories.BaseRepository;

import java.util.List;

public interface MatchRepository extends BaseRepository<Match, Long> {
  List<Match> findByRoundId(Long roundId);

  java.util.Optional<Match> findByExternalMatchId(String externalMatchId);
}
