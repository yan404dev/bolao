package com.bolao.payment.usecases;

import com.bolao.payment.PaymentProvider;
import com.bolao.payment.entities.Payment;
import com.bolao.payment.entities.PaymentStatus;
import com.bolao.payment.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class GeneratePaymentUseCase {

  private final PaymentRepository paymentRepository;
  private final PaymentProvider paymentProvider;

  @Transactional
  public Payment execute(Long betId, Double amount, String description) {
    log.info("Generating PIX payment for bet: {} with amount: {}", betId, amount);

    PaymentProvider.PaymentResponse response = paymentProvider.generatePix(amount, description);

    Payment payment = Payment.builder()
        .betId(betId)
        .externalId(response.externalId())
        .amount(amount)
        .status(PaymentStatus.PENDING)
        .pixCopyPaste(response.pixCopyPaste())
        .pixQrCodeBase64(response.pixQrCodeBase64())
        .expiresAt(response.expiresAt())
        .createdAt(LocalDateTime.now())
        .build();

    payment = paymentRepository.save(payment);

    log.info("Payment generated successfully with ID: {} and External ID: {}", payment.getId(),
        payment.getExternalId());
    return payment;
  }
}
