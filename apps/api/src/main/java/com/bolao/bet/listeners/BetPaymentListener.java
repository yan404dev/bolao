package com.bolao.bet.listeners;

import com.bolao.bet.usecases.ConfirmBetPaymentUseCase;
import com.bolao.payment.events.PaymentApprovedEvent;
import com.bolao.payment.events.PaymentApprovedEventPayload;
import com.bolao.shared.services.FailedEventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Component
@RequiredArgsConstructor
public class BetPaymentListener {

  public static final String EVENT_TYPE = "PAYMENT_APPROVED";

  private final ConfirmBetPaymentUseCase confirmBetPaymentUseCase;
  private final FailedEventService failedEventService;

  @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
  public void onPaymentApproved(PaymentApprovedEvent event) {
    log.info("Reacting to PaymentApprovedEvent for Bet ID: {}", event.getBetId());
    try {
      confirmBetPaymentUseCase.execute(event.getBetId(), event.getPaidAt());
    } catch (Exception e) {
      log.error("Failed to confirm bet payment for bet {}: {}", event.getBetId(), e.getMessage());
      failedEventService.registerFailedEvent(
          EVENT_TYPE,
          PaymentApprovedEventPayload.from(event),
          e.getMessage());
    }
  }
}
