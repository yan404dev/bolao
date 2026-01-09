"use client";

import { motion } from "framer-motion";
import { useTickerBanner } from "./hooks";

export function TickerBanner() {
  const { ticketsSold, prizePool, hasActiveRound, isLoading } = useTickerBanner();

  if (isLoading) {
    return (
      <div className="w-full bg-yellow-400 text-black py-1 shadow-sm overflow-hidden flex justify-center">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse py-1">Carregando dados...</span>
      </div>
    );
  }

  if (!hasActiveRound) {
    return (
      <div className="w-full bg-gray-900 text-yellow-400 py-1 overflow-hidden flex justify-center border-b-2 border-yellow-400">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] py-1">Fique atento! Novas rodadas em breve</span>
      </div>
    );
  }

  const text = `🔥 ${ticketsSold} APOSTAS REALIZADAS • 💰 PRÊMIO ESTIMADO: ${prizePool} • 🚀 RODADA ABERTA • `;

  return (
    <div className="w-full bg-yellow-400 text-black py-2 overflow-hidden border-b-2 border-black">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} className="text-xs font-black uppercase italic tracking-wider mx-6 flex items-center gap-2">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
