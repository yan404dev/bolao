import { Trophy } from "lucide-react";

export function RankingTableEmpty() {
  return (
    <div className="bg-white border border-black p-12 text-center space-y-6">
      <div className="w-20 h-20 bg-gray-100 border border-black mx-auto flex items-center justify-center rotate-3">
        <Trophy className="w-10 h-10 text-gray-300" />
      </div>
      <div className="space-y-2">
        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-black">NENHUMA RODADA DISPONÍVEL</h3>
        <p className="text-sm font-bold text-black/50 uppercase tracking-widest leading-relaxed">
          NÃO ENCONTRAMOS NENHUMA RODADA ATIVA PARA EXIBIR O RANKING NO MOMENTO.
        </p>
      </div>
    </div>
  );
}
