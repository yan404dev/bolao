import { Trophy } from "lucide-react";

export function RankingTableEmpty() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center space-y-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
        <Trophy className="w-8 h-8 text-gray-300" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">Nenhuma rodada disponível</h3>
      <p className="text-gray-500">Não encontramos nenhuma rodada ativa para mostrar o ranking.</p>
    </div>
  );
}
