package com.bolao.payment.usecases;

import com.bolao.payment.PaymentProvider;
import com.bolao.payment.entities.Payment;
import com.bolao.payment.entities.PaymentStatus;
import com.bolao.payment.events.PaymentApprovedEvent;
import com.bolao.payment.repositories.PaymentRepository;
import com.bolao.payment.services.WebhookSecurityService;
import com.bolao.shared.exceptions.NotFoundException;
import com.bolao.shared.exceptions.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class HandlePaymentWebhookUseCase {

  private final PaymentRepository paymentRepository;
  private final PaymentProvider paymentProvider;
  private final ApplicationEventPublisher eventPublisher;
  private final WebhookSecurityService securityService;

  public record Result(String message, PaymentStatus status) {
  }

  @Transactional
  public Result execute(String signature, String requestId, Map<String, Object> payload) {
    String resourceId = extractResourceId(payload);

    if (!securityService.isValidSignature(signature, requestId, resourceId)) {
      log.warn("Security check failed for webhook notification: {}", resourceId);
      throw new UnauthorizedException("Invalid signature");
    }

    String type = (String) payload.get("type");
    if (!"payment".equals(type)) {
      return new Result("Event ignored: " + type, null);
    }

    if (resourceId == null) {
      throw new IllegalArgumentException("Missing payment ID in payload");
    }

    return processStatusUpdate(resourceId);
  }

  private Result processStatusUpdate(String externalId) {
    Payment payment = paymentRepository.findByExternalId(externalId)
        .orElseThrow(() -> new NotFoundException("Payment record not found: " + externalId));

    if (payment.isPaid()) {
      return new Result("Payment already processed and approved", payment.getStatus());
    }

    String providerStatus = paymentProvider.getPaymentStatus(externalId);
    PaymentStatus newStatus = mapStatus(providerStatus);

    if (newStatus == PaymentStatus.APPROVED) {
      payment.markAsPaid(LocalDateTime.now());
      eventPublisher.publishEvent(new PaymentApprovedEvent(this,
          externalId, payment.getBetId(), payment.getPaidAt()));
      log.info("Payment {} approved and event published", externalId);
    } else {
      payment.updateStatus(newStatus);
    }

    paymentRepository.save(payment);
    return new Result("Status updated to " + newStatus, newStatus);
  }

  private String extractResourceId(Map<String, Object> payload) {
    Object dataObj = payload.get("data");
    if (dataObj instanceof Map) {
      @SuppressWarnings("unchecked")
      Map<String, Object> data = (Map<String, Object>) dataObj;
      Object id = data.get("id");
      return id != null ? String.valueOf(id) : null;
    }
    Object id = payload.get("id");
    return id != null ? String.valueOf(id) : null;
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
