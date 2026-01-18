import { Suspense } from "react";
import Image from "next/image";
import { TickerBanner } from "@/shared/components/ticker-banner/ticker-banner";
import { UserActions } from "./_components/user-actions/user-actions";
import { ClosedRounds } from "./_components/closed-rounds/closed-rounds";
import { ActiveRoundCTA } from "./_components/active-round-cta/active-round-cta";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mestria no Futebol | Domine a Tática e Vença pelo Conhecimento",
  description: "Analise o desempenho dos clubes, aplique sua estratégia tática e junte-se à elite da inteligência futebolística. Onde a visão de jogo encontra a glória.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <TickerBanner />
      <Image
        src="/hero.webp"
        alt="Hero"
        width={1920}
        height={1080}
        className="w-full h-[220px] sm:h-[400px] md:h-auto object-cover object-[80%_center] sm:object-center"
        priority
      />
      <Suspense fallback={null}>
        <ActiveRoundCTA />
      </Suspense>
      <UserActions />
      <Suspense fallback={null}>
        <ClosedRounds />
      </Suspense>
    </main>
  );
}
