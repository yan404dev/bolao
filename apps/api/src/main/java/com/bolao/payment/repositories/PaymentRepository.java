package com.bolao.payment.repositories;

import com.bolao.payment.entities.Payment;
import com.bolao.payment.entities.PaymentStatus;
import com.bolao.shared.repositories.BaseRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends BaseRepository<Payment, Long> {
  Optional<Payment> findByExternalId(String externalId);

  Optional<Payment> findByBetId(Long betId);

  List<Payment> findByStatus(PaymentStatus status);
}
