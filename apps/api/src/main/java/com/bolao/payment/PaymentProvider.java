package com.bolao.payment;

import java.time.LocalDateTime;

public interface PaymentProvider {

  PaymentResponse generatePix(Double amount, String description);

  String getPaymentStatus(String externalId);

  record PaymentResponse(
      String externalId,
      String pixCopyPaste,
      String pixQrCodeBase64,
      LocalDateTime expiresAt) {
  }
}
