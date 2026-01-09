package com.bolao.fixture;

import com.bolao.round.entities.Match;
import java.util.List;

/**
 * Interface que define o contrato para provedores externos de dados de
 * partidas.
 * Segue o padrão Strategy para permitir múltiplas integrações (API-Football,
 * Scrapers, etc).
 */
public interface ExternalMatchProvider {

    /**
     * Busca os jogos de uma rodada específica em um provedor externo.
     *
     * @param externalRoundId Identificador da rodada no provedor externo.
     * @return Lista de partidas normalizadas para o domínio do Bolão.
     */
    List<Match> fetchMatchesByRound(String externalRoundId);

    /**
     * Busca atualizações em tempo real para jogos que estão ocorrendo no momento.
     *
     * @return Lista de partidas com placares e status atualizados.
     */
    List<Match> fetchLiveScores();

    /**
     * Identifica qual provedor está sendo utilizado.
     *
     * @return Nome ou ID único do provedor.
     */
    String getProviderName();

    /**
     * Busca todas as rodadas disponíveis para a liga e temporada configuradas.
     * Útil para exibir um calendário completo da temporada.
     *
     * @return Lista de nomes das rodadas.
     */
    List<String> fetchAvailableRounds();
}
