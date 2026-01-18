package com.bolao.round.entities;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import com.bolao.round.dtos.MatchGroup;

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
  private Integer externalLeagueId;
  private Integer externalSeason;
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
  private List<MatchGroup> groupedMatches;

  public boolean isOpen() {
    boolean isStatusOpen = status == Status.OPEN;
    if (!isStatusOpen)
      return false;

    if (startDate == null)
      return true;

    return LocalDateTime.now().isBefore(startDate.minusMinutes(1));
  }

  public String getFormattedPrizePool() {
    if (prizePool == null)
      return "R$ 0,00";
    return String.format("R$ %.2f", prizePool).replace(".", ",");
  }
}
