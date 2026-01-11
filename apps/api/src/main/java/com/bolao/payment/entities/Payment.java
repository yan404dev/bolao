package com.bolao.payment.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
  private Long id;
  private Integer version;
  private Long betId;
  private String externalId;
  private Double amount;
  private PaymentStatus status;
  private String pixCopyPaste;
  private String pixQrCodeBase64;
  private LocalDateTime paidAt;
  private LocalDateTime expiresAt;
  private LocalDateTime createdAt;

  public boolean isPaid() {
    return this.status == PaymentStatus.APPROVED;
  }

  public boolean isPending() {
    return this.status == PaymentStatus.PENDING;
  }

  public void markAsPaid(LocalDateTime paidAt) {
    if (isPaid()) {
      return;
    }

    if (this.status == PaymentStatus.EXPIRED) {
      throw new IllegalStateException("Cannot approve an expired payment");
    }

    this.status = PaymentStatus.APPROVED;
    this.paidAt = paidAt != null ? paidAt : LocalDateTime.now();
  }

  public void updateStatus(PaymentStatus newStatus) {
    if (isPaid() && newStatus != PaymentStatus.APPROVED) {
    }
    this.status = newStatus;
  }
}
