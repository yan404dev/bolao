package com.bolao.bet.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "predictions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PredictionEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "bet_id")
  private BetEntity bet;

  @Column(name = "match_id")
  private Long matchId;

  @Column(name = "home_score")
  private Integer homeScore;

  @Column(name = "away_score")
  private Integer awayScore;
}
