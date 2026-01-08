"use client";

import { motion } from "framer-motion";
import { useTickerBanner } from "./hooks";

export function TickerBanner() {
  const { ticketsSold, prizePool, hasActiveRound, isLoading } = useTickerBanner();

  if (isLoading) {
    return (
      <div className="w-full bg-green-600 text-white py-2 overflow-hidden">
        <div className="flex justify-center">
          <span className="text-sm font-medium animate-pulse">Loading...</span>
        </div>
      </div>
    );
  }

  if (!hasActiveRound) {
    return (
      <div className="w-full bg-gray-600 text-white py-2 overflow-hidden">
        <div className="flex justify-center">
          <span className="text-sm font-medium">⚽ No active round at the moment</span>
        </div>
      </div>
    );
  }

  const text = `🎯 ${ticketsSold} tickets sold • 💰 Prize: ${prizePool} • ⚽ Round open • `;

  return (
    <div className="w-full bg-green-600 text-white py-2 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          },
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-sm font-medium mx-4">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
