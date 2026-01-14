package com.bolao.payment.usecases;

import com.bolao.payment.PaymentProvider;
import com.bolao.payment.entities.Payment;
import com.bolao.payment.entities.PaymentStatus;
import com.bolao.payment.repositories.PaymentRepository;
import com.bolao.payment.services.PaymentApprovalService;
import com.bolao.payment.services.WebhookSecurityService;
import com.bolao.shared.exceptions.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class HandlePaymentWebhookUseCase {

  private final PaymentRepository paymentRepository;
  private final PaymentProvider paymentProvider;
  private final WebhookSecurityService securityService;
  private final PaymentApprovalService approvalService;

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

    return findPaymentWithRetry(resourceId)
        .map(this::processStatusUpdate)
        .orElseGet(() -> {
          log.info("Payment record not found locally after retries (likely test or delayed): {}", resourceId);
          return new Result("Payment record not found", null);
        });
  }

  private Optional<Payment> findPaymentWithRetry(String resourceId) {
    for (int i = 0; i < 3; i++) {
      Optional<Payment> payment = paymentRepository.findByExternalId(resourceId);
      if (payment.isPresent()) {
        return payment;
      }
      log.info("Payment {} not found, retrying in 1s... ({}/3)", resourceId, i + 1);
      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        break;
      }
    }
    return paymentRepository.findByExternalId(resourceId);
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
      approvalService.approve(payment);
    } else {
      payment.updateStatus(newStatus);
      paymentRepository.save(payment);
    }

    return new Result("Status updated to " + newStatus, newStatus);
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
      case "rejected", "rejected_by_bank", "cancelled" -> PaymentStatus.REJECTED;
      case "refunded", "charged_back" -> PaymentStatus.REFUNDED;
      case "pending", "in_process", "in_mediation" -> PaymentStatus.PENDING;
      default -> {
        log.info("Unknown MP status '{}' mapped to PENDING", status);
        yield PaymentStatus.PENDING;
      }
    };
  }
}
