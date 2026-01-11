package com.bolao.bet;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.entities.BetEntity;
import com.bolao.bet.entities.Prediction;
import com.bolao.bet.entities.PredictionEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class BetMapper {

  public Bet toDomain(BetEntity entity) {
    Map<Long, Prediction> predictions = new HashMap<>();
    for (PredictionEntity p : entity.getPredictions()) {
      predictions.put(p.getMatchId(), Prediction.builder()
          .matchId(p.getMatchId())
          .homeScore(p.getHomeScore())
          .awayScore(p.getAwayScore())
          .build());
    }

    return Bet.builder()
        .id(entity.getId())
        .roundId(entity.getRoundId())
        .name(entity.getName())
        .phone(entity.getPhone())
        .ticketCode(entity.getTicketCode())
        .points(entity.getPoints())
        .predictions(predictions)
        .status(entity.getStatus())
        .createdAt(entity.getCreatedAt())
        .build();
  }

  public BetEntity toEntity(Bet bet) {
    BetEntity entity = BetEntity.builder()
        .id(bet.getId())
        .roundId(bet.getRoundId())
        .name(bet.getName())
        .phone(bet.getPhone())
        .ticketCode(bet.getTicketCode())
        .points(bet.getPoints())
        .status(bet.getStatus())
        .createdAt(bet.getCreatedAt())
        .build();

    List<PredictionEntity> predictions = bet.getPredictions().values().stream()
        .map(p -> PredictionEntity.builder()
            .bet(entity)
            .matchId(p.getMatchId())
            .homeScore(p.getHomeScore())
            .awayScore(p.getAwayScore())
            .build())
        .toList();

    entity.setPredictions(predictions);
    return entity;
  }
}
