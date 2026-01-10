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
        "**Rodada Normal:** R$ 10,00 destinados ao prêmio + R$ 2,00 de taxa de organização.",
        "**Rodada Acumulada:** R$ 20,00 destinados ao prêmio + R$ 5,00 de taxa de organização.",
        "A taxa de organização é fixa e destinada exclusivamente a cobrir custos como: **hospedagem completa do sistema, taxas bancárias de transferência PIX e outras despesas operacionais**.",
        "100% do valor destinado ao prêmio é distribuído aos vencedores. O JC Bolão não retém qualquer percentual da premiação.",
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
        "Se ninguém atingir 15 pontos, o prêmio acumula para a próxima rodada.",
        "O prêmio acumula **apenas uma vez**.",
        "Na rodada seguinte ao acúmulo, não há pontuação mínima: ganha quem fizer mais pontos.",
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
    {
      id: 7,
      titulo: "Regra Excepcional",
      conteudo: [
        "Concurso 175: Excepcionalmente, esta rodada não acumulará. Quem fizer mais pontos leva o prêmio, independentemente da pontuação mínima.",
      ],
    },
  ];

  const observacao = "Concurso 175 excepcionalmente não acumulará. Quem fizer mais pontos leva o prêmio.";

  return { secoes, observacao };
}
