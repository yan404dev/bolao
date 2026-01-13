package com.bolao.round.repositories;

import com.bolao.round.entities.MatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface JpaMatchRepository extends JpaRepository<MatchEntity, Long>, JpaSpecificationExecutor<MatchEntity> {
  List<MatchEntity> findByRoundId(Long roundId);

  java.util.Optional<MatchEntity> findByExternalMatchId(String externalMatchId);
}
