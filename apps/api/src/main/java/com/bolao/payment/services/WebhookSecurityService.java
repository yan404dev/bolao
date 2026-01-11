package com.bolao.payment.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HexFormat;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class WebhookSecurityService {

  @Value("${mercadopago.webhook.secret:}")
  private String secret;

  private static final String HMAC_SHA256 = "HmacSHA256";

  public boolean isValidSignature(String signature, String requestId, String body) {
    if (secret == null || secret.isEmpty()) {
      log.warn("Webhook secret not configured. Skipping validation.");
      return true;
    }

    if (signature == null || signature.isEmpty() || requestId == null) {
      return false;
    }

    try {
      Map<String, String> signatureParts = parseSignature(signature);
      String ts = signatureParts.get("ts");
      String v1 = signatureParts.get("v1");

      if (ts == null || v1 == null) {
        return false;
      }

      String manifest = String.format("id:%s;request-id:%s;ts:%s;", body, requestId, ts);
      String generatedHash = generateHmac(manifest);

      return generatedHash.equals(v1);
    } catch (Exception e) {
      log.error("Error validating webhook signature", e);
      return false;
    }
  }

  private Map<String, String> parseSignature(String signature) {
    return Arrays.stream(signature.split(","))
        .map(part -> part.split("=", 2))
        .filter(keyValue -> keyValue.length == 2)
        .collect(Collectors.toMap(
            kv -> kv[0].trim(),
            kv -> kv[1].trim(),
            (existing, replacement) -> replacement));
  }

  private String generateHmac(String data) throws NoSuchAlgorithmException, InvalidKeyException {
    Mac mac = Mac.getInstance(HMAC_SHA256);
    SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), HMAC_SHA256);
    mac.init(secretKey);
    return HexFormat.of().formatHex(mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
  }
}
