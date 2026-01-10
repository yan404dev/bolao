package com.bolao.round.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rounds")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoundEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  @Column(name = "external_round_id")
  private String externalRoundId;

  @Column(name = "championship_title")
  private String championshipTitle;

  @Column(name = "championship_logo")
  private String championshipLogo;

  @Enumerated(EnumType.STRING)
  private Status status;

  @Column(name = "start_date")
  private LocalDateTime startDate;

  @Column(name = "end_date")
  private LocalDateTime endDate;

  @Column(name = "total_tickets")
  private Integer totalTickets;

  @Column(name = "prize_pool")
  private Double prizePool;

  @Column(name = "ticket_price")
  private Double ticketPrice;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @OneToMany(mappedBy = "round", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @Builder.Default
  private List<MatchEntity> matches = new ArrayList<>();

  public enum Status {
    OPEN, CLOSED, CALCULATED, CANCELLED
  }
}
