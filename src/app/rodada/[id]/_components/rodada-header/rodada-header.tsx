import { MOCK_RODADA } from "../../rodada.schema";

const statusStyles = {
  aberta: "bg-blue-100 text-blue-700",
  ao_vivo: "bg-red-100 text-red-700",
  encerrada: "bg-gray-100 text-gray-600",
};

const statusLabels = {
  aberta: "Aberta",
  ao_vivo: "🔴 Ao Vivo",
  encerrada: "Encerrada",
};

export function RodadaHeader() {
  const rodada = MOCK_RODADA;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full mb-2 ${statusStyles[rodada.status]}`}>
            {statusLabels[rodada.status]}
          </span>
          <h1 className="text-xl font-bold text-gray-900">{rodada.titulo}</h1>
          <p className="text-sm text-gray-500 mt-1">{rodada.dataInicio} — {rodada.dataFim}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">{rodada.premiacao}</p>
          <p className="text-xs text-gray-500">Premiação total</p>
        </div>
      </div>
    </div>
  );
}
