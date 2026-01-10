package com.bolao.round.usecases;

import com.bolao.round.RoundService;
import com.bolao.round.dtos.RankingDto;
import com.bolao.shared.entities.ResultEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class GetRoundRankingUseCase {

  private final RoundService roundService;

  public ResultEntity<RankingDto> execute(Long id, String search, Integer minPoints, Pageable pageable) {
    log.info("Executing GetRoundRankingUseCase for round: {}", id);
    return roundService.getRanking(id, search, minPoints, pageable);
  }
}
