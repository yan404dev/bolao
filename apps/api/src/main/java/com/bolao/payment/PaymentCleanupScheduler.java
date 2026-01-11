package com.bolao.payment;

import com.bolao.bet.usecases.CancelLatePendingBetsUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PaymentCleanupScheduler {

  private final CancelLatePendingBetsUseCase cancelLatePendingBetsUseCase;

  @Scheduled(fixedDelay = 300000)
  public void cleanupLatePayments() {
    log.debug("Starting scheduled payment and bet cleanup");
    try {
      cancelLatePendingBetsUseCase.execute();
    } catch (Exception e) {
      log.error("Failed to cleanup late payments: {}", e.getMessage());
    }
  }
}
