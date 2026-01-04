package com.bolao.round.repositories;

import com.bolao.round.entities.Round;
import com.bolao.round.entities.RoundEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface JpaRoundRepository extends JpaRepository<RoundEntity, Long>, JpaSpecificationExecutor<RoundEntity> {
  Optional<RoundEntity> findByExternalRoundId(String externalRoundId);

  List<RoundEntity> findByStatus(Round.Status status);
}
