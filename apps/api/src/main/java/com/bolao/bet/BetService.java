package com.bolao.bet;

import com.bolao.bet.dtos.CreateBetDto;
import com.bolao.bet.dtos.PredictionDto;
import com.bolao.bet.entities.Bet;
import com.bolao.bet.entities.Prediction;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.entities.Match;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BetService {

  private final BetRepository betRepository;
  private final RoundRepository roundRepository;
  private final MatchRepository matchRepository;

  @Transactional
  public Bet create(CreateBetDto dto) {
    Round round = roundRepository.findById(dto.getRoundId())
        .orElseThrow(() -> new NotFoundException("Round not found: " + dto.getRoundId()));

    if (!round.isOpen()) {
      throw new IllegalStateException("Round is not open for bets");
    }

    List<Match> matches = matchRepository.findByRoundId(dto.getRoundId());
    validatePredictionsCount(dto, matches);

    String ticketCode = generateTicketCode(dto.getRoundId());
    Map<Long, Prediction> predictions = mapPredictions(dto.getPredictions());

    Bet bet = Bet.builder()
        .roundId(dto.getRoundId())
        .name(dto.getName())
        .phone(dto.getPhone())
        .ticketCode(ticketCode)
        .predictions(predictions)
        .points(0)
        .createdAt(LocalDateTime.now())
        .build();

    return betRepository.save(bet);
  }

  @Transactional(readOnly = true)
  public Optional<Bet> findByTicketCode(String ticketCode) {
    return betRepository.findByTicketCode(ticketCode);
  }

  @Transactional(readOnly = true)
  public List<Bet> findByRoundId(Long roundId) {
    return betRepository.findByRoundId(roundId);
  }

  private void validatePredictionsCount(CreateBetDto dto, List<Match> matches) {
    if (dto.getPredictions().size() != matches.size()) {
      throw new IllegalArgumentException(
          "Must provide predictions for all " + matches.size() + " matches");
    }
  }

  private String generateTicketCode(Long roundId) {
    String uuid = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    return String.format("%d-%s", roundId, uuid);
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
