import { TickerBanner } from "@/shared/components/ticker-banner";
import { Footer } from "@/shared/components/footer";
import { ChevronLeft, Trophy } from "lucide-react";
import Link from "next/link";

interface RankingRodadaPageProps {
  params: Promise<{ id: string }>;
}

const MOCK_RANKING = [
  { posicao: 1, nome: "João Silva", bilhete: "175-001", pontos: 24, acertosExatos: 6, acertosVencedor: 6 },
  { posicao: 2, nome: "Maria Santos", bilhete: "175-015", pontos: 22, acertosExatos: 5, acertosVencedor: 7 },
  { posicao: 3, nome: "Pedro Oliveira", bilhete: "175-023", pontos: 21, acertosExatos: 5, acertosVencedor: 6 },
  { posicao: 4, nome: "Ana Costa", bilhete: "175-034", pontos: 19, acertosExatos: 4, acertosVencedor: 7 },
  { posicao: 5, nome: "Carlos Lima", bilhete: "175-042", pontos: 18, acertosExatos: 4, acertosVencedor: 6 },
  { posicao: 6, nome: "Fernanda Souza", bilhete: "175-056", pontos: 17, acertosExatos: 4, acertosVencedor: 5 },
  { posicao: 7, nome: "Lucas Pereira", bilhete: "175-067", pontos: 16, acertosExatos: 3, acertosVencedor: 7 },
  { posicao: 8, nome: "Juliana Alves", bilhete: "175-078", pontos: 15, acertosExatos: 3, acertosVencedor: 6 },
  { posicao: 9, nome: "Roberto Dias", bilhete: "175-089", pontos: 14, acertosExatos: 3, acertosVencedor: 5 },
  { posicao: 10, nome: "Patrícia Mendes", bilhete: "175-095", pontos: 13, acertosExatos: 2, acertosVencedor: 7 },
];

const getMedalha = (posicao: number) => {
  switch (posicao) {
    case 1: return "🥇";
    case 2: return "🥈";
    case 3: return "🥉";
    default: return null;
  }
};

export default async function RankingRodadaPage({ params }: RankingRodadaPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50">
      <TickerBanner bilhetesVendidos={127} premiacao="R$ 1.270,00" />

      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href={`/rodada/${id}`} className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors p-2 -ml-2">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <span className="font-semibold text-gray-900">Ranking Rodada #{id}</span>
          <div className="w-9" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 p-5 text-center">
          <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-2" />
          <p className="text-xs text-amber-600 uppercase tracking-wider font-semibold mb-1">Vencedor</p>
          <p className="text-xl font-bold text-gray-900">{MOCK_RANKING[0].nome}</p>
          <p className="text-sm text-gray-500">#{MOCK_RANKING[0].bilhete} • {MOCK_RANKING[0].pontos} pts</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-12">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apostador</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Bilhete</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Exatos</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_RANKING.map((item) => (
                <tr key={item.posicao} className={item.posicao <= 3 ? "bg-amber-50/50" : ""}>
                  <td className="px-4 py-3">
                    {getMedalha(item.posicao) || <span className="text-gray-400 text-sm">{item.posicao}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900 text-sm">{item.nome}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">#{item.bilhete}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-green-600 font-medium text-sm">{item.acertosExatos}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-bold ${item.posicao === 1 ? "text-amber-600" : "text-gray-700"}`}>
                      {item.pontos}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center text-sm text-gray-500">
          <span className="text-green-600 font-medium">Exatos:</span> Acertou o placar (+3 pts) •
          <span className="text-gray-600 font-medium ml-2">Vencedor:</span> Acertou quem ganhou (+1 pt)
        </div>
      </div>

      <Footer />
    </main>
  );
}
