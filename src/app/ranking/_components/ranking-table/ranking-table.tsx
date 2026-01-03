"use client";

import { useRankingTableModel } from "./ranking-table.model";

export function RankingTable() {
  const { rodada, ranking } = useRankingTableModel();

  const getMedalha = (posicao: number) => {
    switch (posicao) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return null;
    }
  };

  return (
    <div>
      {/* Header da Rodada */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${rodada.status === "aberta"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
                }`}>
                {rodada.status === "aberta" ? "🔴 Ao vivo" : "Encerrada"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{rodada.titulo}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Encerramento</p>
            <p className="text-sm font-medium text-gray-900">{rodada.dataEncerramento}</p>
          </div>
        </div>
      </div>

      {/* Tabela de Ranking */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Apostador
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bilhete
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exatos
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vencedor
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pontos
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ranking.map((apostador) => (
              <tr
                key={apostador.id}
                className={`hover:bg-gray-50 transition-colors ${apostador.posicao <= 3 ? "bg-amber-50/50" : ""
                  }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-lg">
                    {getMedalha(apostador.posicao) || (
                      <span className="text-gray-400 text-sm font-medium">{apostador.posicao}</span>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`font-medium ${apostador.posicao <= 3 ? "text-gray-900" : "text-gray-700"
                    }`}>
                    {apostador.nome}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    #{apostador.numeroBilhete}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-green-600 font-medium">{apostador.acertosExatos}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-gray-600">{apostador.acertosVencedor}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className={`font-bold ${apostador.posicao === 1
                    ? "text-amber-600 text-lg"
                    : apostador.posicao <= 3
                      ? "text-gray-900"
                      : "text-gray-700"
                    }`}>
                    {apostador.pontos}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legenda */}
      <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
        <span><strong className="text-green-600">Exatos:</strong> Acertou o placar (+3 pts)</span>
        <span><strong className="text-gray-600">Vencedor:</strong> Acertou quem ganhou (+1 pt)</span>
      </div>
    </div>
  );
}
