package com.bolao.payment.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Version
  private Integer version;

  @Column(name = "bet_id", nullable = false)
  private Long betId;

  @Column(name = "external_id")
  private String externalId;

  @Column(nullable = false)
  private Double amount;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private PaymentStatus status;

  @Column(name = "pix_copy_paste", length = 1000)
  private String pixCopyPaste;

  @Column(name = "pix_qr_code_base64", length = 5000)
  private String pixQrCodeBase64;

  @Column(name = "paid_at")
  private LocalDateTime paidAt;

  @Column(name = "expires_at")
  private LocalDateTime expiresAt;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;
}
