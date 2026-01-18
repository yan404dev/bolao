import { MatchEntity } from "@/shared/entities";
import dayjs from "dayjs";

export type MatchStatusType = "SCHEDULED" | "LIVE" | "FINISHED";

export function getMatchStatusStyle(status: string): string {
  switch (status) {
    case "FINISHED":
      return "text-gray-500";
    case "LIVE":
      return "text-red-600";
    default:
      return "text-blue-600";
  }
}

export function getMatchStatusBadgeStyle(status: string): string {
  if (status === "LIVE") {
    return "bg-red-600 text-white animate-pulse";
  }
  return "bg-white text-black";
}

export function getScoreBoxStyle(status: string): string {
  if (status === "FINISHED") {
    return "bg-gray-900 text-white";
  }
  return "bg-yellow-400 text-black";
}

export function formatMatchStatusLabel(match: MatchEntity): string {
  const { status, kickoffTime, estimatedEndTime } = match;
  const start = dayjs(kickoffTime).format("DD/MM HH:mm");
  const end = estimatedEndTime ? dayjs(estimatedEndTime).format("HH:mm") : null;

  switch (status) {
    case "FINISHED":
      return `ENCERRADO • ${start}`;
    case "LIVE":
      return "🔴 AO VIVO";
    default:
      return end ? `${start} - ${end}` : start;
  }
}
