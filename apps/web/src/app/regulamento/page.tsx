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
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-transparent hover:border-black"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </Link>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 leading-none flex items-center gap-3">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500" />
                Regulamento <span className="text-yellow-400">Oficial</span>
              </h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2 ml-1">Como funciona a nossa arena</p>
            </div>
          </div>

          <div className="flex bg-black px-6 py-3 brutalist-shadow-yellow items-center gap-3">
            <Info className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-black uppercase italic text-sm tracking-widest">Leitura Obrigatória</span>
          </div>
        </div>

        <RegulamentoContent />
      </div>

    </main>
  );
}
