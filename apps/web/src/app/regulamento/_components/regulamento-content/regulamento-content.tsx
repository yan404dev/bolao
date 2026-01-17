"use client";

import { AccordionItem } from "@/shared/components/accordion";
import { useRegulamentoContentModel } from "./regulamento-content.model";

export function RegulamentoContent() {
  const { secoes, observacao } = useRegulamentoContentModel();

  const renderConteudo = (texto: string) => {
    const parts = texto.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="text-black font-bold">
          {part}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="p-8 bg-black border border-black mb-8">
        <p className="text-white font-black uppercase italic tracking-widest text-lg">
          Regulamento Oficial da Arena de Elite
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Leia atentamente todas as regras antes de participar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {secoes.map((secao, index) => (
          <AccordionItem
            key={secao.id}
            title={`${index + 1}. ${secao.titulo}`}
            defaultOpen={index === 0}
          >
            {/* Custom layout for specific sections */}
            {secao.id === 3 ? (
              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-3">
                  <span className="bg-yellow-400 text-black px-3 py-1 text-2xl font-black italic border border-black min-w-[3rem] text-center">
                    3
                  </span>
                  <span>
                    Acertou o <strong className="uppercase">placar exato</strong> da partida
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-gray-200 text-black px-3 py-1 text-2xl font-black italic border border-black min-w-[3rem] text-center">
                    1
                  </span>
                  <span>
                    Errou o placar, mas acertou o <strong className="uppercase">resultado</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-red-500 text-white px-3 py-1 text-2xl font-black italic border border-black min-w-[3rem] text-center">
                    0
                  </span>
                  <span>Errou o resultado da partida</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-lg">
                {secao.conteudo.map((item, i) => (
                  <p key={i} className="leading-relaxed">
                    {renderConteudo(item)}
                  </p>
                ))}
              </div>
            )}
          </AccordionItem>
        ))}
      </div>

      <div className="mt-12 p-8 bg-yellow-400 border border-black">
        <div className="flex items-start gap-4">
          <span className="text-4xl">⚠️</span>
          <div>
            <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-2">
              Atenção Especial
            </h4>
            <p className="text-lg font-bold leading-tight">{observacao}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-100 border border-black">
        <h4 className="text-lg font-black uppercase italic tracking-tighter mb-3">
          Resumo dos Valores
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-black bg-white">
            <div className="text-sm font-bold uppercase tracking-widest mb-1 text-gray-500">
              Rodada Normal
            </div>
            <div className="text-2xl font-black italic">R$ 10,00</div>
            <div className="text-sm text-gray-600 mt-1">
              + R$ 2,00 taxa de organização
            </div>
            <div className="text-xs text-gray-400 mt-2">Total: R$ 12,00</div>
          </div>
          <div className="p-4 border border-black bg-black text-white">
            <div className="text-sm font-bold uppercase tracking-widest mb-1 text-yellow-400">
              Rodada Acumulada
            </div>
            <div className="text-2xl font-black italic">R$ 20,00</div>
            <div className="text-sm text-gray-300 mt-1">
              + R$ 5,00 taxa de organização
            </div>
            <div className="text-xs text-gray-400 mt-2">Total: R$ 25,00</div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 italic leading-relaxed">
          * A taxa de organização destina-se exclusivamente ao custeio de: hospedagem do sistema, taxas bancárias para
          transferências PIX e demais despesas operacionais, não gerando lucro à administração da Arena de Elite.
        </p>
      </div>
    </div>
  );
}
