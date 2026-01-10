package com.bolao.bet.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bet {
  public enum PaymentStatus {
    PENDING, PAID, CANCELLED
  }

  private Long id;
  private Long roundId;
  private String ticketCode;
  private String name;
  private String phone;
  private Map<Long, Prediction> predictions;
  private Integer points;
  private PaymentStatus status;
  private LocalDateTime createdAt;
}
