package com.bolao.payment;

import com.bolao.bet.usecases.CancelLatePendingBetsUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentCleanupScheduler {

  private final CancelLatePendingBetsUseCase cancelLatePendingBetsUseCase;

  @Scheduled(fixedDelay = 300000)
  public void cleanupLatePayments() {
    try {
      cancelLatePendingBetsUseCase.execute();
    } catch (Exception e) {
    }
  }
}
