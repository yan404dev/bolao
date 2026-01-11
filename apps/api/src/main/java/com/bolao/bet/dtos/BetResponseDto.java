package com.bolao.bet.dtos;

import com.bolao.bet.entities.Bet;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BetResponseDto {
  private Bet bet;
  private PaymentDetails payment;

  @Data
  @Builder
  public static class PaymentDetails {
    private String pixCopyPaste;
    private String pixQrCodeBase64;
    private Double amount;
    private String expiration;
  }
}
