package com.bolao.bet.schedulers;

import com.bolao.bet.listeners.BetPaymentListener;
import com.bolao.bet.usecases.ConfirmBetPaymentUseCase;
import com.bolao.payment.events.PaymentApprovedEventPayload;
import com.bolao.shared.entities.FailedEventEntity;
import com.bolao.shared.services.FailedEventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
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

    log.info("Processing {} failed payment events", pendingEvents.size());

    for (FailedEventEntity event : pendingEvents) {
      if (!BetPaymentListener.EVENT_TYPE.equals(event.getEventType())) {
        continue;
      }

      processEvent(event);
    }

    long deadCount = failedEventService.countDeadEvents();
    if (deadCount > 0) {
      log.warn("There are {} events in Dead Letter Queue requiring manual intervention", deadCount);
    }
  }

  private void processEvent(FailedEventEntity event) {
    try {
      failedEventService.markAsProcessing(event);

      PaymentApprovedEventPayload payload = failedEventService.deserializePayload(
          event, PaymentApprovedEventPayload.class);

      log.info("Retrying payment confirmation for bet {}, attempt {}/{}",
          payload.getBetId(), event.getAttempts() + 1, event.getMaxAttempts());

      confirmBetPaymentUseCase.execute(payload.getBetId(), payload.getPaidAt());

      failedEventService.markAsResolved(event);

    } catch (Exception e) {
      log.error("Retry failed for event {}: {}", event.getId(), e.getMessage());
      failedEventService.registerRetryFailure(event, e.getMessage());
    }
  }
}
