export type PositionZone = "libertadores" | "pre-liberta" | "normal" | "relegation";

export function getPositionZone(position: number): PositionZone {
  if (position <= 4) return "libertadores";
  if (position <= 6) return "pre-liberta";
  if (position >= 17) return "relegation";
  return "normal";
}

export function getPositionStyle(position: number): string {
  const zone = getPositionZone(position);

  switch (zone) {
    case "libertadores":
      return "bg-blue-600 text-white";
    case "pre-liberta":
      return "bg-blue-300 text-black";
    case "relegation":
      return "bg-red-600 text-white";
    default:
      return "bg-white text-black";
  }
}

export const POSITION_ZONE_CONFIG = {
  libertadores: {
    label: "Libertadores",
    bgColor: "bg-blue-600",
    borderColor: "border-blue-600",
  },
  "pre-liberta": {
    label: "Pré-Libertadores",
    bgColor: "bg-blue-300",
    borderColor: "border-blue-300",
  },
  normal: {
    label: "Normal",
    bgColor: "bg-white",
    borderColor: "border-black",
  },
  relegation: {
    label: "Rebaixamento",
    bgColor: "bg-red-600",
    borderColor: "border-red-600",
  },
} as const;
