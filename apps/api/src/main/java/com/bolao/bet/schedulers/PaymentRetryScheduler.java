package com.bolao.bet.schedulers;

import com.bolao.bet.listeners.BetPaymentListener;
import com.bolao.bet.usecases.ConfirmBetPaymentUseCase;
import com.bolao.payment.events.PaymentApprovedEventPayload;
import com.bolao.shared.entities.FailedEventEntity;
import com.bolao.shared.services.FailedEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PaymentRetryScheduler {

  private final FailedEventService failedEventService;
  private final ConfirmBetPaymentUseCase confirmBetPaymentUseCase;

  @Scheduled(fixedDelay = 60000)
  public void processFailedPaymentEvents() {
    List<FailedEventEntity> pendingEvents = failedEventService.findEventsReadyForRetry();

    if (pendingEvents.isEmpty()) {
      return;
    }

    for (FailedEventEntity event : pendingEvents) {
      if (!BetPaymentListener.EVENT_TYPE.equals(event.getEventType())) {
        continue;
      }

      processEvent(event);
    }
  }

  private void processEvent(FailedEventEntity event) {
    try {
      failedEventService.markAsProcessing(event);

      PaymentApprovedEventPayload payload = failedEventService.deserializePayload(
          event, PaymentApprovedEventPayload.class);

      confirmBetPaymentUseCase.execute(payload.getBetId(), payload.getPaidAt());

      failedEventService.markAsResolved(event);

    } catch (Exception e) {
      failedEventService.registerRetryFailure(event, e.getMessage());
    }
  }
}
