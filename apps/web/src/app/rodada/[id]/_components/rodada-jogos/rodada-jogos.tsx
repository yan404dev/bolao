import { MOCK_JOGOS, JogoStatus } from "../../rodada.schema";

const statusStyles: Record<JogoStatus, string> = {
  a_jogar: "text-blue-600",
  ao_vivo: "text-red-600",
  finalizado: "text-gray-500",
};

export function RodadaJogos() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Jogos</h2>
      {MOCK_JOGOS.map((jogo) => (
        <div key={jogo.id} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex flex-col items-center gap-1">
              <img src={jogo.timeCasaImg} alt={jogo.timeCasa} className="w-10 h-10 object-contain" />
              <span className="text-xs font-medium text-gray-700 text-center">{jogo.timeCasa}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-8 h-10 flex items-center justify-center text-xl font-bold rounded-lg ${jogo.status === "finalizado" ? "bg-gray-100" : "bg-gray-50"}`}>
                {jogo.golsCasa ?? "-"}
              </span>
              <span className="text-gray-300 text-xs">x</span>
              <span className={`w-8 h-10 flex items-center justify-center text-xl font-bold rounded-lg ${jogo.status === "finalizado" ? "bg-gray-100" : "bg-gray-50"}`}>
                {jogo.golsVisitante ?? "-"}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <img src={jogo.timeVisitanteImg} alt={jogo.timeVisitante} className="w-10 h-10 object-contain" />
              <span className="text-xs font-medium text-gray-700 text-center">{jogo.timeVisitante}</span>
            </div>
          </div>
          <p className={`text-center text-[10px] mt-2 ${statusStyles[jogo.status]}`}>
            {jogo.status === "finalizado" ? `Finalizado • ${jogo.data}` : jogo.data}
          </p>
        </div>
      ))}
    </div>
  );
}
