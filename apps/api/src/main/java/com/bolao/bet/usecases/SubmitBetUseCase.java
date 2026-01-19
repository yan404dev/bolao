package com.bolao.bet.usecases;

import com.bolao.bet.dtos.BetResponseDto;
import com.bolao.bet.dtos.CreateBetDto;
import com.bolao.bet.dtos.PredictionDto;
import com.bolao.bet.entities.Bet;
import com.bolao.bet.entities.Prediction;
import com.bolao.payment.entities.Payment;
import com.bolao.payment.usecases.GeneratePaymentUseCase;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.entities.Match;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.round.services.RoundStatsService;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class SubmitBetUseCase {

  private final BetRepository betRepository;
  private final RoundRepository roundRepository;
  private final MatchRepository matchRepository;
  private final RoundStatsService statsService;
  private final GeneratePaymentUseCase generatePaymentUseCase;

  @Transactional
  public BetResponseDto execute(CreateBetDto dto) {
    Round round = roundRepository.findById(dto.getRoundId())
        .orElseThrow(() -> new NotFoundException("Round not found: " + dto.getRoundId()));

    if (!round.isOpen()) {
      throw new IllegalStateException("Round is not open for bets");
    }

    List<Match> matches = matchRepository.findByRoundId(dto.getRoundId());
    validatePredictionsCount(dto, matches);

    Map<Long, Prediction> predictions = mapPredictions(dto.getPredictions());

    Bet bet = Bet.builder()
        .roundId(dto.getRoundId())
        .name(dto.getName())
        .phone(dto.getPhone())
        .ticketCode(null)
        .predictions(predictions)
        .points(0)
        .status(Bet.PaymentStatus.PENDING)
        .createdAt(LocalDateTime.now())
        .build();

    Bet savedBet = betRepository.save(bet);

    Payment payment = generatePaymentUseCase.execute(
        savedBet.getId(),
        round.getTicketPrice() != null ? round.getTicketPrice() : 10.0,
        "Bolão JC: " + savedBet.getTicketCode());

    statsService.updateRoundStats(savedBet.getRoundId());

    return BetResponseDto.builder()
        .bet(savedBet)
        .payment(BetResponseDto.PaymentDetails.builder()
            .pixCopyPaste(payment.getPixCopyPaste())
            .pixQrCodeBase64(payment.getPixQrCodeBase64())
            .amount(payment.getAmount())
            .expiration(payment.getExpiresAt().toString())
            .build())
        .build();
  }

  private void validatePredictionsCount(CreateBetDto dto, List<Match> matches) {
    if (dto.getPredictions().size() != matches.size()) {
      throw new IllegalArgumentException(
          "Must provide predictions for all " + matches.size() + " matches");
    }
  }

  private Map<Long, Prediction> mapPredictions(List<PredictionDto> dtos) {
    Map<Long, Prediction> predictions = new HashMap<>();
    for (PredictionDto p : dtos) {
      predictions.put(p.getMatchId(), Prediction.builder()
          .matchId(p.getMatchId())
          .homeScore(p.getHomeScore())
          .awayScore(p.getAwayScore())
          .build());
    }
    return predictions;
  }
}
