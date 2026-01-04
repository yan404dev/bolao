import Image from "next/image";
import { TickerBanner } from "@/shared/components/ticker-banner";
import { UserActions } from "./_components/user-actions";
import { ClosedRounds } from "./_components/closed-rounds";
import { Footer } from "@/shared/components/footer";

export default function Home() {
  return (
    <main>
      <TickerBanner bilhetesVendidos={127} premiacao="R$ 1.250,00" />
      <Image src="/hero.png" alt="Hero" width={1920} height={1080} className="w-full" />
      <UserActions />
      <ClosedRounds />
      <Footer />
    </main>
  );
}
