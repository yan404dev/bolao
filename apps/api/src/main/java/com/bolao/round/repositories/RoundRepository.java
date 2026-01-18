package com.bolao.round.repositories;

import com.bolao.round.entities.Round;
import com.bolao.shared.repositories.BaseRepository;

import java.util.List;
import java.util.Optional;

public interface RoundRepository extends BaseRepository<Round, Long> {
  Optional<Round> findByExternalRoundId(String externalRoundId);

  List<Round> findByStatus(Round.Status status);

  List<Round> findAllSorted();

  List<Round> findByStatusSorted(Round.Status status);

  Optional<Round> findPreviousRound(java.time.LocalDateTime date);

  Optional<Round> findFirstByExternalLeagueIdAndExternalSeasonAndStartDateGreaterThanOrderByStartDateAsc(
      Integer leagueId, Integer season, java.time.LocalDateTime startDate);
}
