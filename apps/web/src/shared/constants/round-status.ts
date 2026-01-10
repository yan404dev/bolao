import { RoundStatus } from "@/shared/entities/round.entity";

export const roundStatusStyles: Record<RoundStatus, string> = {
  OPEN: "bg-yellow-400 text-black",
  LIVE: "bg-red-600 text-white animate-pulse",
  CLOSED: "bg-gray-900 text-white",
  CANCELLED: "bg-gray-400 text-gray-600",
};

export const roundStatusLabels: Record<RoundStatus, string> = {
  OPEN: "ABERTA",
  LIVE: "AO VIVO",
  CLOSED: "ENCERRADA",
  CANCELLED: "CANCELADA",
};
