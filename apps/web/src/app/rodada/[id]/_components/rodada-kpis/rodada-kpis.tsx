import { MOCK_RODADA } from "../../rodada.schema";

export function RodadaKpis() {
  const rodada = MOCK_RODADA;

  const kpis = [
    { label: "Bilhetes", value: rodada.totalBilhetes, icon: "🎫" },
    { label: "Premiação", value: rodada.premiacao, icon: "💰" },
    { label: "Jogos", value: "5", icon: "⚽" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <span className="text-2xl mb-2 block">{kpi.icon}</span>
          <p className="text-lg font-bold text-gray-900">{kpi.value}</p>
          <p className="text-xs text-gray-500">{kpi.label}</p>
        </div>
      ))}
    </div>
  );
}
