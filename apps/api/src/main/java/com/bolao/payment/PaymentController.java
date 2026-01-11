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

    String resourceId = extractResourceId(payload);

    if (!securityService.isValidSignature(signature, requestId, resourceId)) {
      log.warn("Security check failed for webhook notification");
      return ResponseEntity.status(403).body(ApiResponse.error("Invalid signature"));
    }

    String type = (String) payload.get("type");
    if (!"payment".equals(type)) {
      return ResponseEntity.ok(ApiResponse.ok("Event ignored: " + type));
    }

    if (resourceId == null) {
      return ResponseEntity.badRequest().body(ApiResponse.error("Missing payment ID"));
    }

    HandlePaymentWebhookUseCase.Result result = handlePaymentWebhookUseCase.execute(resourceId);
    log.info("Webhook processed: {}", result.message());

    return ResponseEntity.ok(ApiResponse.ok(result.message()));
  }

  private String extractResourceId(Map<String, Object> payload) {
    Object dataObj = payload.get("data");
    if (dataObj instanceof Map) {
      @SuppressWarnings("unchecked")
      Map<String, Object> data = (Map<String, Object>) dataObj;
      Object id = data.get("id");
      return id != null ? String.valueOf(id) : null;
    }
    // Suporte para o botao "Testar" do Mercado Pago que pode enviar o ID fora do
    // data dependendo da versao
    Object id = payload.get("id");
    return id != null ? String.valueOf(id) : null;
  }
}
