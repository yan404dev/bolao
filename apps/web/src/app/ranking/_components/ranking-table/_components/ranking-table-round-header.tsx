interface RankingTableRoundHeaderProps {
  rodada: {
    id: number;
    titulo: string;
    status: "aberta" | "encerrada";
    dataEncerramento: string;
  }
}

export function RankingTableRoundHeader({ rodada }: RankingTableRoundHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${rodada.status === "aberta" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}>
              {rodada.status === "aberta" ? "🔴 Ao vivo" : "Encerrada"}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{rodada.titulo}</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Início da Rodada</p>
          <p className="text-sm font-medium text-gray-900">{rodada.dataEncerramento}</p>
        </div>
      </div>
    </div>
  );
}
