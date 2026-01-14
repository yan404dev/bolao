package com.bolao.payment.tests;

import com.bolao.payment.services.WebhookSecurityService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.HexFormat;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import static org.junit.jupiter.api.Assertions.*;

class WebhookSecurityServiceTest {

  private WebhookSecurityService securityService;
  private final String testSecret = "test_webhook_secret";

  @BeforeEach
  void setUp() {
    securityService = new WebhookSecurityService();
    ReflectionTestUtils.setField(securityService, "secret", testSecret);
  }

  @Test
  void shouldValidateCorrectSignature() throws Exception {
    String resourceId = "12345";
    String requestId = "req-abc";
    String ts = String.valueOf(Instant.now().getEpochSecond());

    String manifest = String.format("id:%s;request-id:%s;ts:%s;", resourceId, requestId, ts);
    String v1 = generateHmac(manifest, testSecret);
    String signature = "ts=" + ts + ",v1=" + v1;

    assertTrue(securityService.isValidSignature(signature, requestId, resourceId));
  }

  @Test
  void shouldRejectExpiredTimestamp() throws Exception {
    String resourceId = "12345";
    String requestId = "req-abc";
    String ts = String.valueOf(Instant.now().getEpochSecond() - 600); // 10 minutes ago

    String manifest = String.format("id:%s;request-id:%s;ts:%s;", resourceId, requestId, ts);
    String v1 = generateHmac(manifest, testSecret);
    String signature = "ts=" + ts + ",v1=" + v1;

    assertFalse(securityService.isValidSignature(signature, requestId, resourceId));
  }

  @Test
  void shouldRejectInvalidSignature() {
    String resourceId = "12345";
    String requestId = "req-abc";
    String ts = String.valueOf(Instant.now().getEpochSecond());
    String signature = "ts=" + ts + ",v1=invalidhash";

    assertFalse(securityService.isValidSignature(signature, requestId, resourceId));
  }

  private String generateHmac(String data, String key) throws NoSuchAlgorithmException, InvalidKeyException {
    Mac mac = Mac.getInstance("HmacSHA256");
    SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HmacSHA256");
    mac.init(secretKey);
    return HexFormat.of().formatHex(mac.doFinal(data.getBytes()));
  }
}
