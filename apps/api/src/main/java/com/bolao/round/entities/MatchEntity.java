package com.bolao.round.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchEntity {

  @Id
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "round_id")
  private RoundEntity round;

  @Column(name = "home_team")
  private String homeTeam;

  @Column(name = "home_team_logo")
  private String homeTeamLogo;

  @Column(name = "home_score")
  private Integer homeScore;

  @Column(name = "away_team")
  private String awayTeam;

  @Column(name = "away_team_logo")
  private String awayTeamLogo;

  @Column(name = "away_score")
  private Integer awayScore;

  @Column(name = "kickoff_time")
  private LocalDateTime kickoffTime;

  @Enumerated(EnumType.STRING)
  private Status status;

  public enum Status {
    SCHEDULED, LIVE, FINISHED
  }
}
