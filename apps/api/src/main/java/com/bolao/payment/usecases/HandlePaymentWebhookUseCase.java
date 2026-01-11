package com.bolao.payment.usecases;

import com.bolao.payment.PaymentProvider;
import com.bolao.payment.entities.Payment;
import com.bolao.payment.entities.PaymentStatus;
import com.bolao.payment.events.PaymentApprovedEvent;
import com.bolao.payment.repositories.PaymentRepository;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class HandlePaymentWebhookUseCase {

  private final PaymentRepository paymentRepository;
  private final PaymentProvider paymentProvider;
  private final ApplicationEventPublisher eventPublisher;

  public record Result(String message, PaymentStatus status) {
  }

  @Transactional
  public Result execute(String externalId) {
    log.info("Processing webhook notification for: {}", externalId);

    Payment payment = paymentRepository.findByExternalId(externalId)
        .orElseThrow(() -> new NotFoundException("Payment record not found: " + externalId));

    if (payment.isPaid()) {
      return new Result("Payment already processed and approved", payment.getStatus());
    }

    String providerStatus = paymentProvider.getPaymentStatus(externalId);
    PaymentStatus newStatus = mapStatus(providerStatus);

    if (newStatus == PaymentStatus.APPROVED) {
      payment.markAsPaid(LocalDateTime.now());

      // Publica evento para desacoplamento total entre módulos
      eventPublisher.publishEvent(new PaymentApprovedEvent(this,
          externalId, payment.getBetId(), payment.getPaidAt()));

      log.info("Payment {} approved and event published", externalId);
    } else {
      payment.updateStatus(newStatus);
    }

    paymentRepository.save(payment);
    return new Result("Status updated to " + newStatus, newStatus);
  }

  private PaymentStatus mapStatus(String status) {
    if (status == null)
      return PaymentStatus.PENDING;

    return switch (status.toLowerCase()) {
      case "approved", "paid" -> PaymentStatus.APPROVED;
      case "expired" -> PaymentStatus.EXPIRED;
      case "rejected", "rejected_by_bank", "cc_rejected_bad_filled_date" -> PaymentStatus.REJECTED;
      case "refunded", "charged_back" -> PaymentStatus.REFUNDED;
      case "cancelled", "cancelled_by_user" -> PaymentStatus.REJECTED;
      case "in_process", "pending" -> PaymentStatus.PENDING;
      default -> PaymentStatus.PENDING;
    };
  }
}
