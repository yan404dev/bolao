"use client";

import { motion } from "framer-motion";
import { TickerBannerProps } from "./ticker-banner.types";

export function TickerBanner({
  ticketsSold = 127,
  prizePool = "R$ 1,250.00"
}: TickerBannerProps) {
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
