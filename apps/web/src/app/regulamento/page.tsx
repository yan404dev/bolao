import { RegulamentoContent } from "./_components";
import { TickerBanner } from "@/shared/components/ticker-banner/ticker-banner";
import { ChevronLeft, FileText, Info } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/shared/components/back-button/back-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diretrizes | Respeito e Mérito na Competição",
  description: "Conheça os pilares da nossa arena. Regras claras para uma competição justa, baseada exclusivamente em mérito e competência analítica.",
};

export default function RegulationPage() {
  return (
    <main className="min-h-screen bg-white pb-12">
      <TickerBanner />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PageHeader
          title="Regulamento"
          highlightedTitle="Oficial"
          subtitle="Como funciona a nossa arena de especialistas"
          badge={
            <div className="flex bg-black px-6 py-3 border border-yellow-400 items-center gap-3">
              <Info className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-black uppercase italic text-sm tracking-widest">Leitura Obrigatória</span>
            </div>
          }
        />

        <RegulamentoContent />
      </div>

    </main>
  );
}
