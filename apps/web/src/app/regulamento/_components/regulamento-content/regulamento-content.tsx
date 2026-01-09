"use client";

import { AccordionItem } from "@/shared/components/accordion";
import { useRegulamentoContentModel } from "./regulamento-content.model";

export function RegulamentoContent() {
  const { observacao } = useRegulamentoContentModel();

  return (
    <div className="space-y-4">
      <div className="p-8 bg-black border-2 border-transparent mb-8 brutalist-shadow-yellow">
        <p className="text-white font-black uppercase italic tracking-widest text-lg">
          Tudo que você precisa saber sobre como funciona o bolão.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AccordionItem title="Como ganho pontos?" defaultOpen>
          <div className="space-y-4 text-lg">
            <p className="flex items-center gap-3">
              <span className="bg-yellow-400 text-black px-3 py-1 text-2xl font-black italic border-2 border-black">3</span>
              <span>Acertou o <strong className="uppercase">placar exato</strong> (ex: você disse 2x1, terminou 2x1)</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="bg-gray-200 text-black px-3 py-1 text-2xl font-black italic border-2 border-black">1</span>
              <span>Errou o placar, mas <strong className="uppercase">acertou quem venceu</strong></span>
            </p>
            <p className="flex items-center gap-3">
              <span className="bg-red-500 text-white px-3 py-1 text-2xl font-black italic border-2 border-black">0</span>
              <span>Errou <strong className="uppercase">absolutamente tudo</strong></span>
            </p>
          </div>
        </AccordionItem>

        <AccordionItem title="Quanto preciso fazer para ganhar?">
          <div className="text-xl space-y-4">
            <p>Você precisa fazer <strong className="text-yellow-500 text-3xl italic">15 pontos</strong> na rodada para levar o prêmio.</p>
            <p className="bg-gray-100 p-4 border-l-4 border-black italic">Se ninguém atingir 15 pontos, o prêmio acumula para a próxima rodada.</p>
          </div>
        </AccordionItem>

        <AccordionItem title="Como é dividido o prêmio?">
          <div className="space-y-4 text-xl">
            <p>Quem fizer <strong className="uppercase underline decoration-yellow-400 decoration-4">mais pontos leva 100% do prêmio</strong>.</p>
            <p>Se houver empate na pontuação, o prêmio é dividido igualmente entre os vencedores.</p>
          </div>
        </AccordionItem>

        <AccordionItem title="Quanto custa participar?">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border-2 border-black bg-white brutalist-shadow hover:bg-yellow-400 transition-colors">
              <div className="text-sm font-bold uppercase tracking-widest mb-1 text-gray-500">Valor Normal</div>
              <div className="text-4xl font-black italic">R$ 10,00</div>
            </div>
            <div className="p-6 border-2 border-black bg-black text-white brutalist-shadow-yellow hover:scale-105 transition-transform">
              <div className="text-sm font-bold uppercase tracking-widest mb-1 text-yellow-400">Quando Acumula</div>
              <div className="text-4xl font-black italic">R$ 20,00</div>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem title="O que acontece se o prêmio acumular?">
          <div className="space-y-4 text-lg">
            <p>Se ninguém fizer 15 pontos, o prêmio vai para a próxima rodada.</p>
            <p>Nesse caso, a aposta sobe para <strong className="bg-yellow-400 px-2 border-2 border-black">R$ 20,00</strong>.</p>
            <p className="font-black uppercase italic tracking-tighter text-2xl mt-4">O prêmio só acumula uma vez!</p>
            <p>Na rodada seguinte, ganha quem fizer mais pontos (não precisa dos 15).</p>
          </div>
        </AccordionItem>

        <AccordionItem title="E se um jogo for cancelado ou adiado?">
          <div className="space-y-4 text-lg">
            <div className="flex flex-col gap-2">
              <strong className="uppercase text-yellow-500">Jogo cancelado:</strong>
              <p>A pontuação mínima para ganhar cai para <strong className="bg-black text-white px-2 italic">13 pontos</strong>.</p>
            </div>
            <div className="flex flex-col gap-2">
              <strong className="uppercase text-yellow-500">Jogo interrompido:</strong>
              <p>Esperamos até 48h pelo resultado. Se não terminar, o jogo é cancelado.</p>
            </div>
            <div className="flex flex-col gap-2">
              <strong className="uppercase text-yellow-500">Jogo encerrado antes dos 90 min:</strong>
              <p>Vale o placar do momento oficial.</p>
            </div>
          </div>
        </AccordionItem>
      </div>

      <div className="mt-12 p-8 bg-yellow-400 border-4 border-black brutalist-shadow">
        <div className="flex items-start gap-4">
          <span className="text-4xl">⚠️</span>
          <div>
            <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Atenção Especial</h4>
            <p className="text-lg font-bold leading-tight">
              {observacao}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
