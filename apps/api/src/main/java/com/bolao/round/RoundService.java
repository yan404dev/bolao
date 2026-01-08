package com.bolao.round;

import com.bolao.bet.entities.Bet;
import com.bolao.bet.entities.Prediction;
import com.bolao.bet.repositories.BetRepository;
import com.bolao.fixture.MatchApiClient;
import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Match;
import com.bolao.round.entities.Round;
import com.bolao.round.repositories.MatchRepository;
import com.bolao.round.repositories.RoundRepository;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;

/**
 * Service responsible for round management operations.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RoundService {

  private final RoundRepository roundRepository;
  private final MatchRepository matchRepository;
  private final BetRepository betRepository;
  private final MatchApiClient matchApiClient;
  private final ScoreCalculator scoreCalculator;

  @Transactional
  public Round create(String title, String externalRoundId, Long prizePool) {
    List<Match> matches = matchApiClient.fetchByRoundId(externalRoundId);

    if (matches.isEmpty()) {
      throw new IllegalArgumentException("No matches found for round: " + externalRoundId);
    }

    Round round = Round.builder()
        .title(title)
        .externalRoundId(externalRoundId)
        .status(Round.Status.OPEN)
        .prizePool(prizePool)
        .totalTickets(0)
        .startDate(LocalDateTime.now())
        .createdAt(LocalDateTime.now())
        .build();

    round = roundRepository.save(round);

    for (Match match : matches) {
      match.setRoundId(round.getId());
      matchRepository.save(match);
    }

    round.setMatches(matches);
    return round;
  }

  @Transactional(readOnly = true)
  public List<Round> findAll(Round.Status status) {
    if (status == null) {
      return loadMatchesForAll(roundRepository.findAll());
    }
    return loadMatchesForAll(roundRepository.findByStatus(status));
  }

  private List<Round> loadMatchesForAll(List<Round> rounds) {
    rounds.forEach(this::loadMatches);
    return rounds;
  }

  @Transactional(readOnly = true)
  public Round findById(Long id) {
    Round round = roundRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Round not found: " + id));
    loadMatches(round);
    return round;
  }

  @Transactional(readOnly = true)
  public List<RankingDto> getRanking(Long roundId) {
    List<Bet> bets = betRepository.findByRoundId(roundId);
    List<Match> matches = matchRepository.findByRoundId(roundId);

    List<RankingDto> ranking = bets.stream()
        .map(bet -> {
          int exact = 0;
          int winner = 0;
          for (Match match : matches) {
            if (!match.isFinished())
              continue;

            Prediction prediction = bet.getPredictions().get(match.getId());
            if (prediction == null)
              continue;

            int points = scoreCalculator.calculate(prediction, match);
            if (points == 3)
              exact++;
            else if (points == 1)
              winner++;
          }

          return RankingDto.builder()
              .name(bet.getName())
              .ticketCode(bet.getTicketCode())
              .points(bet.getPoints() != null ? bet.getPoints() : 0)
              .exactScores(exact)
              .winnerScores(winner)
              .build();
        })
        .sorted((a, b) -> Integer.compare(b.getPoints(), a.getPoints()))
        .toList();

    // Assign positions after sorting
    return IntStream.range(0, ranking.size())
        .mapToObj(i -> {
          RankingDto dto = ranking.get(i);
          dto.setPosition(i + 1);
          return dto;
        })
        .toList();
  }

  @Transactional
  public void calculateScores(Long roundId, String externalRoundId) {
    List<Match> updatedMatches = matchApiClient.fetchByRoundId(externalRoundId);

    for (Match match : updatedMatches) {
      match.setRoundId(roundId);
      matchRepository.save(match);
    }

    List<Bet> bets = betRepository.findByRoundId(roundId);
    log.info("Calculating scores for {} bets in round {}", bets.size(), roundId);

    for (Bet bet : bets) {
      int totalPoints = calculateBetPoints(bet, updatedMatches);
      bet.setPoints(totalPoints);
      betRepository.save(bet);
      log.info("Bet {} scored {} points", bet.getTicketCode(), totalPoints);
    }
  }

  private int calculateBetPoints(Bet bet, List<Match> matches) {
    int totalPoints = 0;
    for (Match match : matches) {
      if (!match.isFinished()) {
        continue;
      }

      Prediction prediction = bet.getPredictions().get(match.getId());
      if (prediction == null) {
        continue;
      }

      totalPoints += scoreCalculator.calculate(prediction, match);
    }
    return totalPoints;
  }

  private void loadMatches(Round round) {
    List<Match> matches = matchRepository.findByRoundId(round.getId());
    round.setMatches(matches);
  }
}
