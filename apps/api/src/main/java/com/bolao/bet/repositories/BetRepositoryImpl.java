package com.bolao.bet.repositories;

import com.bolao.bet.BetMapper;
import com.bolao.bet.entities.Bet;
import com.bolao.bet.entities.BetEntity;
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
public class BetRepositoryImpl implements BetRepository {

  private final JpaBetRepository jpaRepository;
  private final BetMapper mapper;

  @Override
  @Transactional
  public Bet save(Bet bet) {
    BetEntity entity = mapper.toEntity(bet);
    entity = jpaRepository.save(entity);
    return mapper.toDomain(entity);
  }

  @Override
  @Transactional
  public List<Bet> saveAll(Iterable<Bet> entities) {
    List<BetEntity> jpaEntities = new java.util.ArrayList<>();
    entities.forEach(bet -> jpaEntities.add(mapper.toEntity(bet)));
    return jpaRepository.saveAll(jpaEntities).stream()
        .map(mapper::toDomain)
        .toList();
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<Bet> findById(Long id) {
    return jpaRepository.findById(id).map(mapper::toDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public List<Bet> findAll() {
    return jpaRepository.findAll().stream()
        .map(mapper::toDomain)
        .toList();
  }

  @Override
  @Transactional
  public void delete(Bet entity) {
    jpaRepository.deleteById(entity.getId());
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    jpaRepository.deleteById(id);
  }

  @Override
  @Transactional
  public void deleteAll(Iterable<Bet> entities) {
    entities.forEach(this::delete);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<Bet> findAll(Pageable pageable) {
    return jpaRepository.findAll(pageable).map(mapper::toDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<Bet> findAll(Specification<Bet> spec, Pageable pageable) {
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
  public List<Bet> findByRoundId(Long roundId) {
    return jpaRepository.findByRoundIdOrderByPointsDesc(roundId).stream()
        .map(mapper::toDomain)
        .toList();
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<Bet> findByTicketCode(String ticketCode) {
    return jpaRepository.findByTicketCode(ticketCode).map(mapper::toDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public long countByRoundId(Long roundId) {
    return jpaRepository.countByRoundId(roundId);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<Bet> findByRoundIdWithFilters(Long roundId, String search, Integer minPoints, Pageable pageable) {
    return jpaRepository.findByRoundIdWithFilters(roundId, search, minPoints, pageable)
        .map(mapper::toDomain);
  }
}
