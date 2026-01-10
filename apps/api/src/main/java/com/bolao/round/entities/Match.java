package com.bolao.round.entities;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Match {
  public enum Status {
    SCHEDULED, LIVE, FINISHED, CANCELLED
  }

  private Long id;
  private Long roundId;
  private String homeTeam;
  private String homeTeamLogo;
  private Integer homeScore;
  private String awayTeam;
  private String awayTeamLogo;
  private Integer awayScore;
  @com.fasterxml.jackson.annotation.JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime kickoffTime;
  private Status status;

  public boolean isFinished() {
    return status == Status.FINISHED;
  }
}
