"use client";

import { AccordionItem } from "@/shared/components/accordion";
import { useRegulamentoContentModel } from "./regulamento-content.model";

export function RegulamentoContent() {
  const { observacao } = useRegulamentoContentModel();

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <p className="text-gray-600">
          Tudo que você precisa saber sobre como funciona o bolão.
        </p>
      </div>

      <div className="px-6">
        <AccordionItem title="Como ganho pontos?" defaultOpen>
          <div className="space-y-2">
            <p><strong>3 pontos</strong> — Acertou o placar exato (ex: você disse 2x1, terminou 2x1)</p>
            <p><strong>1 ponto</strong> — Errou o placar, mas acertou quem venceu</p>
            <p><strong>0 pontos</strong> — Errou tudo</p>
          </div>
        </AccordionItem>

        <AccordionItem title="Quanto preciso fazer para ganhar?">
          <p>Você precisa fazer <strong>pelo menos 15 pontos</strong> na rodada para levar o prêmio.</p>
          <p className="mt-2">Se ninguém atingir 15 pontos, o prêmio acumula para a próxima rodada.</p>
        </AccordionItem>

        <AccordionItem title="Como é dividido o prêmio?">
          <div className="space-y-2">
            <p>Quem fizer <strong>mais pontos leva 100% do prêmio</strong>.</p>
            <p>Se houver empate na pontuação, o prêmio é dividido igualmente entre os vencedores.</p>
          </div>
        </AccordionItem>

        <AccordionItem title="Quanto custa participar?">
          <div className="space-y-2">
            <p><strong>R$ 10,00</strong> — Valor normal da aposta</p>
            <p><strong>R$ 20,00</strong> — Quando o prêmio está acumulado</p>
          </div>
        </AccordionItem>

        <AccordionItem title="O que acontece se o prêmio acumular?">
          <div className="space-y-2">
            <p>Se ninguém fizer 15 pontos, o prêmio vai para a próxima rodada.</p>
            <p>Nesse caso, a aposta sobe para R$ 20,00.</p>
            <p>O prêmio só acumula <strong>uma vez</strong>. Na rodada seguinte, ganha quem fizer mais pontos (não precisa dos 15).</p>
          </div>
        </AccordionItem>

        <AccordionItem title="E se um jogo for cancelado ou adiado?">
          <div className="space-y-2">
            <p><strong>Jogo cancelado:</strong> A pontuação mínima para ganhar cai para 13 pontos.</p>
            <p><strong>Jogo interrompido:</strong> Esperamos até 48h pelo resultado. Se não terminar, o jogo é cancelado.</p>
            <p><strong>Jogo encerrado antes dos 90 min:</strong> Vale o placar do momento.</p>
          </div>
        </AccordionItem>
      </div>

      <div className="m-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-amber-800 text-sm">
          <strong>⚠️ Atenção:</strong> {observacao}
        </p>
      </div>
    </div>
  );
}
