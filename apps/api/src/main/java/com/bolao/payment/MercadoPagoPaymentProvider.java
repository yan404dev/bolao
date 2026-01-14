package com.bolao.payment;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.payment.PaymentCreateRequest;
import com.mercadopago.client.payment.PaymentPayerRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.stereotype.Component;

import com.mercadopago.core.MPRequestOptions;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Slf4j
@Component
@ConditionalOnExpression("!'${mercadopago.access.token:}'.isEmpty()")
public class MercadoPagoPaymentProvider implements PaymentProvider {

  @Value("${mercadopago.access.token:}")
  private String accessToken;

  @PostConstruct
  public void init() {
    if (accessToken != null && !accessToken.isEmpty()) {
      MercadoPagoConfig.setAccessToken(accessToken);
      log.info("Mercado Pago SDK initialized");
    }
  }

  @Override
  public PaymentResponse generatePix(Double amount, String description) {
    var createRequest = PaymentCreateRequest.builder()
        .transactionAmount(new BigDecimal(amount.toString()))
        .description(description)
        .paymentMethodId("pix")
        .payer(PaymentPayerRequest.builder().email("pagador@bolao.com.br").build())
        .installments(1)
        .build();

    String idempotencyKey = UUID.randomUUID().toString();
    Map<String, String> headers = new HashMap<>();
    headers.put("X-Idempotency-Key", idempotencyKey);

    MPRequestOptions requestOptions = MPRequestOptions.builder()
        .customHeaders(headers)
        .build();

    try {
      Payment payment = new PaymentClient().create(createRequest, requestOptions);
      log.info("PIX generated successfully. ID: {}, IdempotencyKey: {}", payment.getId(), idempotencyKey);
      return mapToResponse(payment);
    } catch (MPApiException e) {
      log.error("MP API Error - Status: {}, Content: {}, IdempotencyKey: {}",
          e.getStatusCode(), e.getApiResponse().getContent(), idempotencyKey);
      throw new RuntimeException("Payment Gateway Error: " + e.getApiResponse().getContent());
    } catch (MPException e) {
      log.error("MP SDK Error: {}, IdempotencyKey: {}", e.getMessage(), idempotencyKey);
      throw new RuntimeException("Payment Gateway Error: " + e.getMessage());
    }
  }

  @Override
  public String getPaymentStatus(String externalId) {
    int maxRetries = 3;
    int attempt = 0;

    while (attempt < maxRetries) {
      try {
        Payment payment = new PaymentClient().get(Long.parseLong(externalId));
        return payment.getStatus();
      } catch (MPException | MPApiException e) {
        attempt++;
        log.warn("Attempt {}/{} failed to fetch MP status for {}: {}", attempt, maxRetries, externalId, e.getMessage());
        if (attempt >= maxRetries) {
          throw new RuntimeException("Gateway Connectivity Error after " + maxRetries + " attempts: " + e.getMessage());
        }
        try {
          Thread.sleep(1000 * attempt);
        } catch (InterruptedException ie) {
          Thread.currentThread().interrupt();
          throw new RuntimeException("Interrupted during retry backoff", ie);
        }
      }
    }
    return null;
  }

  private PaymentResponse mapToResponse(Payment payment) {
    var interaction = payment.getPointOfInteraction();
    if (interaction == null || interaction.getTransactionData() == null) {
      throw new RuntimeException("Invalid gateway response: Missing PIX interaction data");
    }

    var data = interaction.getTransactionData();
    return new PaymentResponse(
        payment.getId().toString(),
        data.getQrCode(),
        data.getQrCodeBase64(),
        payment.getDateOfExpiration() != null
            ? payment.getDateOfExpiration().toLocalDateTime()
            : OffsetDateTime.now().plusHours(2).toLocalDateTime());
  }
}
