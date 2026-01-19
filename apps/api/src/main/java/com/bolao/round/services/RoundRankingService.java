package com.bolao.round.services;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Match;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.shared.entities.ResultEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoundRankingService {

  private final BetRepository betRepository;
  private final MatchRepository matchRepository;
  private final RoundScoringService scoringService;

  @Transactional(readOnly = true)
  public ResultEntity<RankingDto> getRanking(Long roundId, String search, Integer minPoints, Pageable pageable) {
    Page<Bet> betsPage = betRepository.findByRoundIdWithFilters(roundId, search, minPoints, pageable);
    List<Match> matches = matchRepository.findByRoundId(roundId);

    List<RankingDto> items = betsPage.getContent().stream()
        .map(bet -> {
          BetScoreBreakdown breakdown = scoringService.calculateBetScoreBreakdown(bet, matches);

          return RankingDto.builder()
              .name(bet.getName())
              .ticketCode(bet.getTicketCode())
              .points(bet.getPoints() != null ? bet.getPoints() : 0)
              .exactScores(breakdown.exactScores())
              .winnerScores(breakdown.winnerScores())
              .build();
        })
        .toList();

    int startPosition = (int) pageable.getOffset() + 1;
    for (int i = 0; i < items.size(); i++) {
      items.get(i).setPosition(startPosition + i);
    }

    return ResultEntity.<RankingDto>builder()
        .items(items)
        .totalItems(betsPage.getTotalElements())
        .totalPages(betsPage.getTotalPages())
        .currentPage(betsPage.getNumber())
        .build();
  }
}
