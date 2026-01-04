package com.bolao.round.repositories;

import com.bolao.round.RoundMapper;
import com.bolao.round.entities.Match;
import com.bolao.round.entities.MatchEntity;
import com.bolao.round.entities.RoundEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Primary
@RequiredArgsConstructor
public class MatchRepositoryImpl implements MatchRepository {

  private final JpaMatchRepository jpaRepository;
  private final JpaRoundRepository jpaRoundRepository;
  private final RoundMapper mapper;

  @Override
  @Transactional
  public Match save(Match match) {
    RoundEntity round = match.getRoundId() != null
        ? jpaRoundRepository.findById(match.getRoundId()).orElse(null)
        : null;
    MatchEntity entity = mapper.toMatchEntity(match, round);
    entity = jpaRepository.save(entity);
    return mapper.toMatchDomain(entity);
  }

  @Override
  @Transactional
  public List<Match> saveAll(Iterable<Match> entities) {
    List<MatchEntity> jpaEntities = new java.util.ArrayList<>();
    for (Match match : entities) {
      RoundEntity round = match.getRoundId() != null
          ? jpaRoundRepository.findById(match.getRoundId()).orElse(null)
          : null;
      jpaEntities.add(mapper.toMatchEntity(match, round));
    }
    return jpaRepository.saveAll(jpaEntities).stream()
        .map(mapper::toMatchDomain)
        .toList();
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<Match> findById(Long id) {
    return jpaRepository.findById(id).map(mapper::toMatchDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public List<Match> findAll() {
    return jpaRepository.findAll().stream()
        .map(mapper::toMatchDomain)
        .toList();
  }

  @Override
  @Transactional
  public void delete(Match entity) {
    jpaRepository.deleteById(entity.getId());
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    jpaRepository.deleteById(id);
  }

  @Override
  @Transactional
  public void deleteAll(Iterable<Match> entities) {
    entities.forEach(this::delete);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<Match> findAll(Pageable pageable) {
    return jpaRepository.findAll(pageable).map(mapper::toMatchDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<Match> findAll(Specification<Match> spec, Pageable pageable) {
    throw new UnsupportedOperationException("Specification queries not yet implemented");
  }

  @Override
  @Transactional(readOnly = true)
  public long count() {
    return jpaRepository.count();
  }

  @Override
  @Transactional(readOnly = true)
  public boolean existsById(Long id) {
    return jpaRepository.existsById(id);
  }

  @Override
  @Transactional(readOnly = true)
  public List<Match> findByRoundId(Long roundId) {
    return jpaRepository.findByRoundId(roundId).stream()
        .map(mapper::toMatchDomain)
        .toList();
  }
}
