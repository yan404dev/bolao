package com.bolao.payment;

import com.bolao.payment.services.WebhookSecurityService;
import com.bolao.payment.usecases.HandlePaymentWebhookUseCase;
import com.bolao.shared.dtos.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

  private final HandlePaymentWebhookUseCase handlePaymentWebhookUseCase;
  private final WebhookSecurityService securityService;

  @PostMapping("/webhook")
  public ResponseEntity<ApiResponse<String>> handleWebhook(
      @RequestHeader(value = "x-signature", required = false) String signature,
      @RequestHeader(value = "x-request-id", required = false) String requestId,
      @RequestBody Map<String, Object> payload) {

    log.info("Webhook received (ID: {}). Payload: {}", requestId, payload);

    if (!securityService.isValidSignature(signature, requestId, payload.toString())) {
      log.warn("Security check failed for webhook notification");
      return ResponseEntity.status(403).body(ApiResponse.error("Invalid signature"));
    }

    String type = (String) payload.get("type");
    if (!"payment".equals(type)) {
      return ResponseEntity.ok(ApiResponse.ok("Event ignored: " + type));
    }

    Object dataObj = payload.get("data");
    if (!(dataObj instanceof Map)) {
      return ResponseEntity.badRequest().body(ApiResponse.error("Invalid payload structure"));
    }

    @SuppressWarnings("unchecked")
    Map<String, Object> data = (Map<String, Object>) dataObj;
    String externalId = String.valueOf(data.get("id"));

    if (externalId == null || "null".equals(externalId)) {
      return ResponseEntity.badRequest().body(ApiResponse.error("Missing payment ID"));
    }

    HandlePaymentWebhookUseCase.Result result = handlePaymentWebhookUseCase.execute(externalId);
    log.info("Webhook processed: {}", result.message());

    return ResponseEntity.ok(ApiResponse.ok(result.message()));
  }
}
