package com.bolao.round.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Round {

  public enum Status {
    OPEN, LIVE, CLOSED
  }

  private Long id;
  private String title;
  private String externalRoundId;
  private Status status;
  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private Integer totalTickets;
  private Long prizePool;
  private List<Match> matches;
  private LocalDateTime createdAt;

  public boolean isOpen() {
    return status == Status.OPEN;
  }

  public String getFormattedPrizePool() {
    if (prizePool == null)
      return "R$ 0,00";
    return String.format("R$ %.2f", prizePool / 100.0).replace(".", ",");
  }
}
