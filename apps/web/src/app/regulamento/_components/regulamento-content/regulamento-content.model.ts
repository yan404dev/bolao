import { Secao } from "./regulamento-content.types";

export function useRegulamentoContentModel() {
  const secoes: Secao[] = [
    {
      id: 1,
      titulo: "Sobre o Bolão",
      conteudo: [
        "Este bolão tem caráter exclusivamente recreativo e colaborativo.",
        "A participação é voluntária e entre pessoas conhecidas.",
        "A administração do JC Bolão não obtém lucro sobre a premiação, recebendo apenas uma taxa fixa pelos custos de organização.",
        "Esta iniciativa não configura casa de apostas, loteria ou qualquer modalidade de exploração de jogos de azar prevista na legislação brasileira.",
      ],
    },
    {
      id: 2,
      titulo: "Valores e Taxas",
      conteudo: [
        "**Rodada Normal:** R$ 10,00 destinados ao prêmio + R$ 2,00 de taxa de organização (Total R$ 12,00).",
        "**Rodada Acumulada (Prêmio Dobrado):** R$ 20,00 destinados ao prêmio + R$ 5,00 de taxa de organização (Total R$ 25,00).",
        "A taxa de organização é fixa e destinada exclusivamente a cobrir custos como: **hospedagem completa do sistema, taxas bancárias de transferência PIX e outras despesas operacionais**.",
        "100% do valor arrecadado para o prêmio em cada rodada é distribuído. Em caso de acúmulo, o valor total arrecadado na rodada anterior é somado ao prêmio da rodada seguinte.",
      ],
    },
    {
      id: 3,
      titulo: "Sistema de Pontuação",
      conteudo: [
        "**3 pontos:** Acertou o placar exato da partida.",
        "**1 ponto:** Errou o placar, mas acertou o resultado (vitória, empate ou derrota).",
        "**0 pontos:** Errou o resultado da partida.",
      ],
    },
    {
      id: 4,
      titulo: "Pontuação Mínima e Premiação",
      conteudo: [
        "Para levar o prêmio, o participante precisa fazer no mínimo **15 pontos** na rodada.",
        "Quem fizer mais pontos leva o prêmio integral.",
        "Em caso de empate na pontuação, o prêmio é dividido igualmente entre os vencedores.",
      ],
    },
    {
      id: 5,
      titulo: "Acúmulo do Prêmio",
      conteudo: [
        "Caso nenhum participante atinja a pontuação mínima de **15 pontos** em uma rodada normal, o valor destinado ao prêmio acumula para a rodada seguinte.",
        "**Validade da Participação:** As participações são válidas exclusivamente para a rodada em que foram adquiridas. Caso o prêmio acumule, o participante deve adquirir uma nova participação para concorrer ao prêmio acumulado na rodada seguinte.",
        "**Regra da Rodada Acumulada:** Na rodada com prêmio acumulado, **não há pontuação mínima** para vencer. Quem fizer a maior pontuação entre os participantes da rodada leva o prêmio total (valor acumulado + valor arrecadado na rodada atual).",
        "O prêmio acumula **apenas uma vez** consecutiva. Se houver empate na maior pontuação, o prêmio é dividido.",
      ],
    },
    {
      id: 6,
      titulo: "Partidas Canceladas, Interrompidas ou Encerradas",
      conteudo: [
        "**Partida cancelada:** A pontuação mínima para ganhar passa a ser **13 pontos**.",
        "**Partida interrompida:** Aguardamos até 48 horas pela conclusão. Se não houver desfecho nesse prazo, a partida é considerada cancelada.",
        "**Partida encerrada antes dos 90 minutos:** Vale o placar oficial no momento do encerramento.",
      ],
    },
  ];

  const observacao = "A participação é válida apenas para a rodada em que foi adquirida. Em caso de acúmulo, é necessária uma nova participação.";

  return { secoes, observacao };
}
