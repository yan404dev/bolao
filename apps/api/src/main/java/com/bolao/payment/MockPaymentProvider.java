package com.bolao.payment;

import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
@ConditionalOnExpression("'${mercadopago.access.token:}'.isEmpty()")
public class MockPaymentProvider implements PaymentProvider {

  @Override
  public PaymentResponse generatePix(Double amount, String description) {
    return new PaymentResponse(
        "MOCK-" + UUID.randomUUID().toString(),
        "00020101021226850014br.gov.bcb.pix0136mock-key-123-456-789-abc5204000053039865405" + amount
            + "5802BR5913BOLAO_API6009SAO_PAULO62070503***6304ABCD",
        "base64-qr-code-placeholder",
        LocalDateTime.now().plusMinutes(30));
  }

  @Override
  public String getPaymentStatus(String externalId) {
    return "approved";
  }
}
