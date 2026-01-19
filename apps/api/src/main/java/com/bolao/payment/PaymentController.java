package com.bolao.payment;

import com.bolao.payment.usecases.HandlePaymentWebhookUseCase;
import com.bolao.shared.dtos.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

  private final HandlePaymentWebhookUseCase handlePaymentWebhookUseCase;

  @PostMapping("/webhook")
  public ResponseEntity<ApiResponse<String>> handleWebhook(
      @RequestHeader(value = "x-signature", required = false) String signature,
      @RequestHeader(value = "x-request-id", required = false) String requestId,
      @RequestBody Map<String, Object> payload) {

    HandlePaymentWebhookUseCase.Result result = handlePaymentWebhookUseCase.execute(signature, requestId, payload);

    return ResponseEntity.ok(ApiResponse.ok(result.message()));
  }
}
