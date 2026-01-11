package com.bolao.payment.repositories;

import com.bolao.payment.entities.PaymentEntity;
import com.bolao.payment.entities.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface JpaPaymentRepository
    extends JpaRepository<PaymentEntity, Long>, JpaSpecificationExecutor<PaymentEntity> {
  Optional<PaymentEntity> findByExternalId(String externalId);

  Optional<PaymentEntity> findByBetId(Long betId);

  List<PaymentEntity> findByStatus(PaymentStatus status);
}
