package com.bolao.round.repositories;

import com.bolao.round.RoundMapper;
import com.bolao.round.entities.Round;
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
public class RoundRepositoryImpl implements RoundRepository {

  private final JpaRoundRepository jpaRepository;
  private final RoundMapper mapper;

  @Override
  @Transactional
  public Round save(Round round) {
    RoundEntity entity = mapper.toEntity(round);
    entity = jpaRepository.save(entity);
    return mapper.toDomain(entity);
  }

  @Override
  @Transactional
  public List<Round> saveAll(Iterable<Round> entities) {
    List<RoundEntity> jpaEntities = new java.util.ArrayList<>();
    entities.forEach(round -> jpaEntities.add(mapper.toEntity(round)));
    return jpaRepository.saveAll(jpaEntities).stream()
        .map(mapper::toDomain)
        .toList();
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<Round> findById(Long id) {
    return jpaRepository.findById(id).map(mapper::toDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public List<Round> findAll() {
    return jpaRepository.findAll().stream()
        .map(mapper::toDomain)
        .toList();
  }

  @Override
  @Transactional
  public void delete(Round entity) {
    jpaRepository.deleteById(entity.getId());
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    jpaRepository.deleteById(id);
  }

  @Override
  @Transactional
  public void deleteAll(Iterable<Round> entities) {
    entities.forEach(this::delete);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<Round> findAll(Pageable pageable) {
    return jpaRepository.findAll(pageable).map(mapper::toDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<Round> findAll(Specification<Round> spec, Pageable pageable) {
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
  public Optional<Round> findByExternalRoundId(String externalRoundId) {
    return jpaRepository.findByExternalRoundId(externalRoundId).map(mapper::toDomain);
  }
}
