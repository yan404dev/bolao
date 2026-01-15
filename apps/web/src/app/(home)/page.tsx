import { Suspense } from "react";
import Image from "next/image";
import { TickerBanner } from "@/shared/components/ticker-banner/ticker-banner";
import { UserActions } from "./_components/user-actions/user-actions";
import { ClosedRounds } from "./_components/closed-rounds/closed-rounds";
import { ActiveRoundCTA } from "./_components/active-round-cta/active-round-cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <TickerBanner />
      <Image
        src="/hero.png"
        alt="Hero"
        width={1920}
        height={1080}
        className="w-full"
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
