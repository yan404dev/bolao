package com.bolao.round.repositories;

import com.bolao.round.entities.MatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaMatchRepository extends JpaRepository<MatchEntity, Long>, JpaSpecificationExecutor<MatchEntity> {
  List<MatchEntity> findByRoundId(Long roundId);

  java.util.Optional<MatchEntity> findByExternalMatchId(String externalMatchId);

  @Modifying
  @Query(value = "DELETE FROM matches WHERE round_id = :roundId AND id NOT IN (SELECT DISTINCT match_id FROM predictions WHERE match_id IS NOT NULL)", nativeQuery = true)
  int deleteOrphanMatchesByRoundId(@Param("roundId") Long roundId);

  // Step 1: Update predictions to point to the canonical (earliest) match ID for
  // each game
  @Modifying
  @Query(value = """
      UPDATE predictions p
      SET match_id = canonical.min_id
      FROM (
        SELECT m.home_team, m.away_team, MIN(m.id) as min_id
        FROM matches m
        WHERE m.round_id = :roundId
        GROUP BY m.home_team, m.away_team
      ) canonical
      INNER JOIN matches m2 ON m2.home_team = canonical.home_team
        AND m2.away_team = canonical.away_team
        AND m2.round_id = :roundId
      WHERE p.match_id = m2.id AND m2.id != canonical.min_id
      """, nativeQuery = true)
  int consolidatePredictions(@Param("roundId") Long roundId);

  // Step 2: Delete all duplicate matches (keeping only the one with smallest ID
  // per game)
  @Modifying
  @Query(value = """
      DELETE FROM matches
      WHERE round_id = :roundId
      AND id NOT IN (
        SELECT MIN(id) FROM matches WHERE round_id = :roundId GROUP BY home_team, away_team
      )
      """, nativeQuery = true)
  int deleteDuplicateMatches(@Param("roundId") Long roundId);
}
