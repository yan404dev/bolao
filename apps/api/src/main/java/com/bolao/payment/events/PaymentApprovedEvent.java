package com.bolao.payment.events;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

import java.time.LocalDateTime;

@Getter
public class PaymentApprovedEvent extends ApplicationEvent {
  private final String externalId;
  private final Long betId;
  private final LocalDateTime paidAt;

  public PaymentApprovedEvent(Object source, String externalId, Long betId, LocalDateTime paidAt) {
    super(source);
    this.externalId = externalId;
    this.betId = betId;
    this.paidAt = paidAt;
  }
}
