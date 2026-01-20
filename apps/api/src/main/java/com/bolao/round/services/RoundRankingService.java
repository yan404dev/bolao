package com.bolao.round.services;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Match;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.shared.entities.ResultEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoundRankingService {

  private final BetRepository betRepository;
  private final MatchRepository matchRepository;
  private final RoundScoringService scoringService;

  @Transactional(readOnly = true)
  public ResultEntity<RankingDto> getRanking(Long roundId, String search, Integer minPoints, Pageable pageable) {
    log.info("Starting ranking calculation for roundId: {}, search: {}, minPoints: {}", roundId, search, minPoints);
    try {
      Page<Bet> betsPage = betRepository.findByRoundIdWithFilters(roundId, search, minPoints, pageable);
      log.info("Found {} bets to process", betsPage.getTotalElements());

      List<Match> matches = matchRepository.findByRoundId(roundId);
      log.info("Found {} matches for the round", matches.size());

      List<RankingDto> items = betsPage.getContent().stream()
          .map(bet -> {
            try {
              BetScoreBreakdown breakdown = scoringService.calculateBetScoreBreakdown(bet, matches);

              return RankingDto.builder()
                  .name(bet.getName())
                  .ticketCode(bet.getTicketCode())
                  .points(bet.getPoints() != null ? bet.getPoints() : 0)
                  .exactScores(breakdown.exactScores())
                  .winnerScores(breakdown.winnerScores())
                  .build();
            } catch (Exception e) {
              log.error("Failed to calculate breakdown for betId: " + (bet != null ? bet.getId() : "null"), e);
              throw e;
            }
          })
          .toList();

      int startPosition = (int) pageable.getOffset() + 1;
      for (int i = 0; i < items.size(); i++) {
        items.get(i).setPosition(startPosition + i);
      }

      log.info("Successfully calculated ranking with {} items", items.size());

      return ResultEntity.<RankingDto>builder()
          .items(items)
          .totalItems(betsPage.getTotalElements())
          .totalPages(betsPage.getTotalPages())
          .currentPage(betsPage.getNumber())
          .build();
    } catch (Exception e) {
      log.error("Top-level error in getRanking for roundId: " + roundId, e);
      throw e;
    }
  }
}
