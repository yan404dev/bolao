package com.bolao.round.entities;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Round {
  public enum Status {
    OPEN, LIVE, CLOSED, CALCULATED, CANCELLED
  }

  private Long id;
  private String title;
  private String externalRoundId;
  private String championshipTitle;
  private String championshipLogo;
  private Status status;
  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private Integer totalTickets;
  private Double prizePool;
  private Double ticketPrice;
  private LocalDateTime createdAt;
  private List<Match> matches;

  public boolean isOpen() {
    return status == Status.OPEN;
  }

  public String getFormattedPrizePool() {
    if (prizePool == null)
      return "R$ 0,00";
    return String.format("R$ %.2f", prizePool / 100.0).replace(".", ",");
  }
}
