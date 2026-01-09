package com.bolao.fixture;

import com.bolao.round.entities.Match;
import com.bolao.round.repositories.MatchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Serviço orquestrador para sincronização de partidas com provedores externos.
 * Atua como uma fachada para a camada de integração.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MatchSyncService {

  private final List<ExternalMatchProvider> providers;
  private final MatchRepository matchRepository;

  /**
   * Busca partidas de uma rodada externa usando o provedor configurado e as
   * persiste localmente.
   */
  public List<Match> fetchAndSyncMatches(Long roundId, String externalRoundId) {
    log.info("Requesting match sync for external round: {} (local id: {})", externalRoundId, roundId);

    List<Match> externalMatches = providers.stream()
        .filter(p -> p.getProviderName().equals("api-football"))
        .findFirst()
        .map(p -> p.fetchMatchesByRound(externalRoundId))
        .orElseThrow(() -> new IllegalStateException("Nenhum provedor de dados configurado"));

    if (roundId != null) {
      for (Match match : externalMatches) {
        match.setRoundId(roundId);
        matchRepository.save(match);
      }
    }

    return externalMatches;
  }

  /**
   * Busca todas as rodadas disponíveis nos provedores configurados.
   */
  public List<String> fetchAvailableRounds() {
    return providers.stream()
        .filter(p -> p.getProviderName().equals("api-football"))
        .findFirst()
        .map(ExternalMatchProvider::fetchAvailableRounds)
        .orElse(List.of());
  }

  /**
   * Atualiza placares ao vivo de jogos em andamento pesquisando em todos os
   * provedores.
   */
  public void syncLiveScores() {
    log.info("Starting live scores sync");

    for (ExternalMatchProvider provider : providers) {
      List<Match> liveMatches = provider.fetchLiveScores();
      if (liveMatches.isEmpty())
        continue;

      for (Match liveMatch : liveMatches) {
        // Tenta encontrar a partida local pelo ID externo (que é o ID da partida no
        // provedor)
        matchRepository.findById(liveMatch.getId()).ifPresent(localMatch -> {
          log.info("Updating score for match {}: {} x {}", localMatch.getId(), liveMatch.getHomeScore(),
              liveMatch.getAwayScore());
          localMatch.setHomeScore(liveMatch.getHomeScore());
          localMatch.setAwayScore(liveMatch.getAwayScore());
          localMatch.setStatus(liveMatch.getStatus());
          matchRepository.save(localMatch);
        });
      }
    }
  }
}
