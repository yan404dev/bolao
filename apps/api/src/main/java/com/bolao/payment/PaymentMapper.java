package com.bolao.payment;

import com.bolao.payment.entities.Payment;
import com.bolao.payment.entities.PaymentEntity;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

  public Payment toDomain(PaymentEntity entity) {
    if (entity == null)
      return null;

    return Payment.builder()
        .id(entity.getId())
        .betId(entity.getBetId())
        .externalId(entity.getExternalId())
        .amount(entity.getAmount())
        .status(entity.getStatus())
        .pixCopyPaste(entity.getPixCopyPaste())
        .pixQrCodeBase64(entity.getPixQrCodeBase64())
        .paidAt(entity.getPaidAt())
        .expiresAt(entity.getExpiresAt())
        .createdAt(entity.getCreatedAt())
        .build();
  }

  public PaymentEntity toEntity(Payment domain) {
    if (domain == null)
      return null;

    return PaymentEntity.builder()
        .id(domain.getId())
        .betId(domain.getBetId())
        .externalId(domain.getExternalId())
        .amount(domain.getAmount())
        .status(domain.getStatus())
        .pixCopyPaste(domain.getPixCopyPaste())
        .pixQrCodeBase64(domain.getPixQrCodeBase64())
        .paidAt(domain.getPaidAt())
        .expiresAt(domain.getExpiresAt())
        .createdAt(domain.getCreatedAt())
        .build();
  }
}
