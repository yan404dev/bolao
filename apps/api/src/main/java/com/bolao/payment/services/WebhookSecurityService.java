package com.bolao.payment.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

@Slf4j
@Service
public class WebhookSecurityService {

  @Value("${mercadopago.webhook.secret:}")
  private String secret;

  public boolean isValidSignature(String signature, String requestId, String body) {
    if (secret == null || secret.isEmpty()) {
      log.warn("Webhook secret not configured. Skipping signature validation.");
      return true;
    }

    if (signature == null || signature.isEmpty() || requestId == null) {
      return false;
    }

    try {
      String[] parts = signature.split(",");
      String ts = null;
      String v1 = null;

      for (String part : parts) {
        String[] keyValue = part.split("=");
        if (keyValue.length == 2) {
          if ("ts".equals(keyValue[0].trim()))
            ts = keyValue[1].trim();
          if ("v1".equals(keyValue[0].trim()))
            v1 = keyValue[1].trim();
        }
      }

      if (ts == null || v1 == null)
        return false;

      String manifest = String.format("id:%s;request-id:%s;ts:%s;", body, requestId, ts);

      Mac sha256Hmac = Mac.getInstance("HmacSHA256");
      SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
      sha256Hmac.init(secretKey);

      byte[] hashBytes = sha256Hmac.doFinal(manifest.getBytes(StandardCharsets.UTF_8));
      String hash = HexFormat.of().formatHex(hashBytes);

      return hash.equals(v1);
    } catch (Exception e) {
      log.error("Signature verification failed", e);
      return false;
    }
  }
}
