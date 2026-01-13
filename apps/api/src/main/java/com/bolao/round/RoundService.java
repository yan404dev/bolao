package com.bolao.round;

import com.bolao.fixture.usecases.SyncAllRoundsUseCase;
import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Match;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.round.services.RoundRankingService;
import com.bolao.shared.entities.ResultEntity;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoundService {

  private final RoundRepository roundRepository;
  private final MatchRepository matchRepository;
  private final SyncAllRoundsUseCase syncAllRoundsUseCase;
  private final RoundRankingService rankingService;

  @Transactional(readOnly = true)
  public List<Round> findAll(Round.Status status) {
    if (status == null) {
      return loadMatchesForAll(roundRepository.findAllSorted());
    }
    return loadMatchesForAll(roundRepository.findByStatusSorted(status));
  }

  @Transactional(readOnly = true)
  public Round findById(Long id) {
    Round round = roundRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Round not found: " + id));
    loadMatches(round);
    return round;
  }

  @Transactional(readOnly = true)
  public ResultEntity<RankingDto> getRanking(Long roundId, String search, Integer minPoints, Pageable pageable) {
    return rankingService.getRanking(roundId, search, minPoints, pageable);
  }

  private List<Round> loadMatchesForAll(List<Round> rounds) {
    rounds.forEach(this::loadMatches);
    return rounds;
  }

  private void loadMatches(Round round) {
    List<Match> matches = matchRepository.findByRoundId(round.getId());
    round.setMatches(matches);
  }
}
