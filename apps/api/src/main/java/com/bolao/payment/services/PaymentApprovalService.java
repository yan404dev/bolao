package com.bolao.payment.services;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.payment.entities.Payment;
import com.bolao.payment.events.PaymentApprovedEvent;
import com.bolao.payment.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentApprovalService {

  private final PaymentRepository paymentRepository;
  private final BetRepository betRepository;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public void approve(Payment payment) {
    if (payment.isPaid()) {
      return;
    }

    payment.markAsPaid(LocalDateTime.now());
    paymentRepository.save(payment);

    betRepository.findById(payment.getBetId()).ifPresent(bet -> {
      if (bet.getTicketCode() == null) {
        bet.setTicketCode(generateTicketCode(bet.getRoundId()));
        bet.setStatus(Bet.PaymentStatus.PAID);
        betRepository.save(bet);
      }
    });

    eventPublisher.publishEvent(new PaymentApprovedEvent(this,
        payment.getExternalId(), payment.getBetId(), payment.getPaidAt()));
  }

  private String generateTicketCode(Long roundId) {
    int code = (int) (Math.random() * 900000) + 100000;
    return String.valueOf(code);
  }
}
