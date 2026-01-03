import { MOCK_RANKING, MOCK_VENCEDOR, MOCK_RODADA } from "../../rodada.schema";
import { Trophy } from "lucide-react";
import Link from "next/link";

const getMedalha = (posicao: number) => {
  switch (posicao) {
    case 1: return "🥇";
    case 2: return "🥈";
    case 3: return "🥉";
    default: return null;
  }
};

interface RodadaRankingProps {
  rodadaId: string;
}

export function RodadaRanking({ rodadaId }: RodadaRankingProps) {
  const isEncerrada = MOCK_RODADA.status === "encerrada";

  return (
    <div className="space-y-4">
      {isEncerrada && (
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 p-5 text-center">
          <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-2" />
          <p className="text-xs text-amber-600 uppercase tracking-wider font-semibold mb-1">Vencedor</p>
          <p className="text-xl font-bold text-gray-900">{MOCK_VENCEDOR.nome}</p>
          <p className="text-sm text-gray-500">#{MOCK_VENCEDOR.bilhete} • {MOCK_VENCEDOR.pontos} pts</p>
          <p className="text-lg font-bold text-green-600 mt-2">{MOCK_VENCEDOR.premio}</p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ranking</h2>
          <Link href={`/ranking/${rodadaId}`} className="text-xs text-green-600 font-medium hover:underline">Ver completo</Link>
        </div>
        <div className="divide-y divide-gray-100">
          {MOCK_RANKING.map((item) => (
            <div key={item.posicao} className={`flex items-center gap-3 px-4 py-3 ${item.posicao <= 3 ? "bg-amber-50/50" : ""}`}>
              <span className="w-6 text-center">
                {getMedalha(item.posicao) || <span className="text-gray-400 text-sm">{item.posicao}</span>}
              </span>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{item.nome}</p>
                <p className="text-xs text-gray-500">#{item.bilhete}</p>
              </div>
              <span className={`font-bold ${item.posicao === 1 ? "text-amber-600" : "text-gray-700"}`}>
                {item.pontos}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
