

interface RankingTableRowProps {
  apostador: {
    posicao: number;
    nome: string;
    numeroBilhete: string;
    pontos: number;
    acertosExatos: number;
    acertosVencedor: number;
  }
}

export function RankingTableRow({ apostador }: RankingTableRowProps) {
  const getMedalha = (posicao: number) => {
    switch (posicao) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return null;
    }
  };

  return (
    <tr
      key={apostador.numeroBilhete}
      className={`hover:bg-gray-50 transition-colors ${apostador.posicao <= 3 ? "bg-amber-50/50" : ""}`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-lg">
          {getMedalha(apostador.posicao) || (
            <span className="text-gray-400 text-sm font-medium">{apostador.posicao}</span>
          )}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`font-medium ${apostador.posicao <= 3 ? "text-gray-900" : "text-gray-700"}`}>
          {apostador.nome}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          #{apostador.numeroBilhete}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-green-600 font-medium">{apostador.acertosExatos}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-gray-600">{apostador.acertosVencedor}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <span className={`font-bold ${apostador.posicao === 1 ? "text-amber-600 text-lg" : apostador.posicao <= 3 ? "text-gray-900" : "text-gray-700"
          }`}>
          {apostador.pontos}
        </span>
      </td>
    </tr>
  );
}
