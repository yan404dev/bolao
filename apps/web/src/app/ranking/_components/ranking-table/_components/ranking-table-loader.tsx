import { Loader2 } from "lucide-react";

export function RankingTableLoader() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
      <p className="text-gray-500">Carregando classificação...</p>
    </div>
  );
}
