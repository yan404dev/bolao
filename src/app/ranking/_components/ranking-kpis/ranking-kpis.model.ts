import { KpiItem } from "./ranking-kpis.types";

export function useRankingKpisModel() {
  const kpis: KpiItem[] = [
    { label: "Bilhetes", value: "127", icon: "🎫" },
    { label: "Premiação", value: "R$ 1.270", icon: "💰" },
    { label: "Participantes", value: "89", icon: "👥" },
    { label: "Jogos", value: "10", icon: "⚽" },
  ];

  return { kpis };
}
