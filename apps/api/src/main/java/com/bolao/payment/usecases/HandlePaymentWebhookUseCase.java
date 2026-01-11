package com.bolao.payment.usecases;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.payment.PaymentProvider;
import com.bolao.payment.entities.Payment;
import com.bolao.payment.entities.PaymentStatus;
import com.bolao.payment.events.PaymentApprovedEvent;
import com.bolao.payment.repositories.PaymentRepository;
import com.bolao.payment.services.WebhookSecurityService;
import com.bolao.shared.exceptions.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class HandlePaymentWebhookUseCase {

  private final PaymentRepository paymentRepository;
  private final BetRepository betRepository;
  private final PaymentProvider paymentProvider;
  private final ApplicationEventPublisher eventPublisher;
  private final WebhookSecurityService securityService;

  public record Result(String message, PaymentStatus status) {
  }

  @Transactional
  public Result execute(String signature, String requestId, Map<String, Object> payload) {
    String resourceId = extractResourceId(payload);
    String type = String.valueOf(payload.get("type"));

    log.info("Webhook received: type={}, resourceId={}", type, resourceId);

    validateSecurity(signature, requestId, resourceId);

    if (!"payment".equals(type)) {
      return new Result("Event ignored: " + type, null);
    }

    if (resourceId == null) {
      throw new IllegalArgumentException("Missing payment ID in payload");
    }

    return paymentRepository.findByExternalId(resourceId)
        .map(this::processStatusUpdate)
        .orElseGet(() -> {
          log.info("Payment record not found locally (likely test notification): {}", resourceId);
          return new Result("Payment record not found", null);
        });
  }

  private void validateSecurity(String signature, String requestId, String resourceId) {
    if (!securityService.isValidSignature(signature, requestId, resourceId)) {
      log.warn("Security check failed for webhook notification: {}", resourceId);
      throw new UnauthorizedException("Invalid signature or missing headers");
    }
  }

  private Result processStatusUpdate(Payment payment) {
    if (payment.isPaid()) {
      return new Result("Payment already processed", payment.getStatus());
    }

    String externalId = payment.getExternalId();
    String providerStatus = paymentProvider.getPaymentStatus(externalId);
    PaymentStatus newStatus = mapStatus(providerStatus);

    log.info("Payment {}: provider reported '{}', mapped to {}", externalId, providerStatus, newStatus);

    if (newStatus == PaymentStatus.APPROVED) {
      approvePayment(payment);
    } else {
      payment.updateStatus(newStatus);
    }

    paymentRepository.save(payment);
    return new Result("Status updated to " + newStatus, newStatus);
  }

  private void approvePayment(Payment payment) {
    payment.markAsPaid(LocalDateTime.now());

    betRepository.findById(payment.getBetId()).ifPresent(bet -> {
      bet.setTicketCode(generateTicketCode(bet.getRoundId()));
      bet.setStatus(Bet.PaymentStatus.PAID);
      betRepository.save(bet);
      log.info("Ticket generated for bet {}: {}", bet.getId(), bet.getTicketCode());
    });

    eventPublisher.publishEvent(new PaymentApprovedEvent(this,
        payment.getExternalId(), payment.getBetId(), payment.getPaidAt()));

    log.info("Payment {} approved and event published", payment.getExternalId());
  }

  private String generateTicketCode(Long roundId) {
    String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    return String.format("%d-%s", roundId, uuid);
  }

  private String extractResourceId(Map<String, Object> payload) {
    if (payload.get("data") instanceof Map<?, ?> data) {
      return Optional.ofNullable(data.get("id")).map(String::valueOf).orElse(null);
    }
    return Optional.ofNullable(payload.get("id")).map(String::valueOf).orElse(null);
  }

  private PaymentStatus mapStatus(String status) {
    if (status == null)
      return PaymentStatus.PENDING;

    return switch (status.toLowerCase()) {
      case "approved", "paid" -> PaymentStatus.APPROVED;
      case "expired" -> PaymentStatus.EXPIRED;
      case "rejected", "rejected_by_bank" -> PaymentStatus.REJECTED;
      case "refunded", "charged_back" -> PaymentStatus.REFUNDED;
      case "cancelled" -> PaymentStatus.REJECTED;
      default -> PaymentStatus.PENDING;
    };
  }
}
