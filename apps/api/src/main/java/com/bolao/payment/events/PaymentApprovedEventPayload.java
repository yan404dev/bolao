package com.bolao.payment.events;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentApprovedEventPayload {
  private String externalId;
  private Long betId;
  private LocalDateTime paidAt;

  public static PaymentApprovedEventPayload from(PaymentApprovedEvent event) {
    return PaymentApprovedEventPayload.builder()
        .externalId(event.getExternalId())
        .betId(event.getBetId())
        .paidAt(event.getPaidAt())
        .build();
  }
}
