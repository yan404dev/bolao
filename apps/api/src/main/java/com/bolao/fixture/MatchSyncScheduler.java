package com.bolao.fixture;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Agendador responsável por manter os dados das partidas sincronizados.
 * Garante que placares ao vivo sejam atualizados automaticamente.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class MatchSyncScheduler {

  private final MatchSyncService matchSyncService;

  /**
   * Sincroniza placares ao vivo a cada 1 minuto.
   * O intervalo pode ser ajustado conforme a necessidade e limites da API.
   */
  @Scheduled(fixedDelay = 60000)
  public void syncLiveScores() {
    log.debug("Triggering scheduled live scores sync");
    try {
      matchSyncService.syncLiveScores();
    } catch (Exception e) {
      log.error("Scheduled live scores sync failed: {}", e.getMessage());
    }
  }
}
