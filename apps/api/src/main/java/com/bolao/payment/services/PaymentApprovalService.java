package com.bolao.payment.services;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.payment.entities.Payment;
import com.bolao.payment.events.PaymentApprovedEvent;
import com.bolao.payment.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentApprovalService {

  private final PaymentRepository paymentRepository;
  private final BetRepository betRepository;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public void approve(Payment payment) {
    if (payment.isPaid()) {
      log.info("Payment {} already marked as paid", payment.getExternalId());
      return;
    }

    payment.markAsPaid(LocalDateTime.now());
    paymentRepository.save(payment);

    betRepository.findById(payment.getBetId()).ifPresent(bet -> {
      if (bet.getTicketCode() == null) {
        bet.setTicketCode(generateTicketCode(bet.getRoundId()));
        bet.setStatus(Bet.PaymentStatus.PAID);
        betRepository.save(bet);
        log.info("Ticket generated for bet {}: {}", bet.getId(), bet.getTicketCode());
      }
    });

    eventPublisher.publishEvent(new PaymentApprovedEvent(this,
        payment.getExternalId(), payment.getBetId(), payment.getPaidAt()));

    log.info("Payment {} approval sequence completed", payment.getExternalId());
  }

  private String generateTicketCode(Long roundId) {
    String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    return String.format("%d-%s", roundId, uuid);
  }
}
