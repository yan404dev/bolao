import { Regra } from "./regulamento-content.types";

export function useRegulamentoContentModel() {
  const regras: Regra[] = [
    {
      id: 1,
      texto: "Placar exato = 3 pontos.",
      destaque: true,
    },
    {
      id: 2,
      texto: "Errou o placar, mas acertou o time vencedor = 1 ponto.",
      destaque: true,
    },
    {
      id: 3,
      texto: "Atenção: Só ganhará o bolão, o apostador que fizer 15 pontos ou mais, qualquer pontuação abaixo de 15 pontos, o bolão ficará acumulado para próxima rodada.",
      destaque: true,
    },
    {
      id: 4,
      texto: "E toda vez que o bolão acumular o valor da aposta vai ser R$ 20,00",
    },
    {
      id: 5,
      texto: "A premiação será dividida da seguinte forma: Primeiro lugar 90%, Segundo lugar 10%.",
      destaque: true,
    },
    {
      id: 6,
      texto: "O bolão só acumulará uma vez.",
    },
    {
      id: 7,
      texto: "Quando o bolão estiver acumulado sairá para aquele que fizer mais pontos.",
    },
    {
      id: 8,
      texto: "Quando um jogo for cancelado a pontuação mínima para ganhar o bolão passa ser de 13 pontos.",
    },
    {
      id: 9,
      texto: "Quando um jogo for interrompido por qualquer motivo, e se os minutos finais for realizado no máximo 48 horas esperaremos o resultado final do jogo. Se o jogo for realizado após 48 horas esse fica cancelado.",
    },
    {
      id: 10,
      texto: "Se um jogo for encerrado também por qualquer motivo antes dos 90 minutos fica valendo o placar do jogo.",
    },
  ];

  const observacao = "Concurso 175 excepcionalmente não acumulará aquele que fizer mais pontos leva o prêmio.";

  return { regras, observacao };
}
