"use client";

import { Zap } from "lucide-react";
import { useBettingModalState } from "@/shared/providers/betting-modal-provider";

export function RoundPlayButton({ status }: { status?: string }) {
  const { openModal } = useBettingModalState();

  const isLive = status === "LIVE";
  const label = isLive ? "ACOMPANHAR" : "JOGAR AGORA";

  return (
    <button
      onClick={isLive ? undefined : openModal}
      className="px-8 py-4 bg-yellow-400 text-black border-2 border-black font-black uppercase italic tracking-tighter text-xl hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] hover:translate-y-0 flex items-center gap-3 disabled:cursor-not-allowed"
    >
      <Zap className="w-6 h-6 fill-current" />
      {label}
    </button>
  );
}
