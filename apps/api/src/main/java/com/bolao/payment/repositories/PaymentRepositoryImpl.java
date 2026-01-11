package com.bolao.payment.repositories;

import com.bolao.payment.PaymentMapper;
import com.bolao.payment.entities.Payment;
import com.bolao.payment.entities.PaymentEntity;
import com.bolao.payment.entities.PaymentStatus;
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
public class PaymentRepositoryImpl implements PaymentRepository {

  private final JpaPaymentRepository jpaRepository;
  private final PaymentMapper mapper;

  @Override
  @Transactional
  public Payment save(Payment entity) {
    PaymentEntity jpaEntity = mapper.toEntity(entity);
    jpaEntity = jpaRepository.save(jpaEntity);
    return mapper.toDomain(jpaEntity);
  }

  @Override
  @Transactional
  public List<Payment> saveAll(Iterable<Payment> entities) {
    List<PaymentEntity> jpaEntities = new java.util.ArrayList<>();
    entities.forEach(e -> jpaEntities.add(mapper.toEntity(e)));
    return jpaRepository.saveAll(jpaEntities).stream()
        .map(mapper::toDomain)
        .toList();
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<Payment> findById(Long id) {
    return jpaRepository.findById(id).map(mapper::toDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public List<Payment> findAll() {
    return jpaRepository.findAll().stream()
        .map(mapper::toDomain)
        .toList();
  }

  @Override
  @Transactional
  public void delete(Payment entity) {
    jpaRepository.deleteById(entity.getId());
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    jpaRepository.deleteById(id);
  }

  @Override
  @Transactional
  public void deleteAll(Iterable<Payment> entities) {
    entities.forEach(this::delete);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<Payment> findAll(Pageable pageable) {
    return jpaRepository.findAll(pageable).map(mapper::toDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<Payment> findAll(Specification<Payment> spec, Pageable pageable) {
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
  public Optional<Payment> findByExternalId(String externalId) {
    return jpaRepository.findByExternalId(externalId).map(mapper::toDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<Payment> findByBetId(Long betId) {
    return jpaRepository.findByBetId(betId).map(mapper::toDomain);
  }

  @Override
  @Transactional(readOnly = true)
  public List<Payment> findByStatus(PaymentStatus status) {
    return jpaRepository.findByStatus(status).stream()
        .map(mapper::toDomain)
        .toList();
  }
}
