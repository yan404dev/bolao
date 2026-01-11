import { roundStatusStyles, roundStatusLabels } from "@/shared/constants";
import { RoundStatus } from "@/shared/entities/round.entity";

export const getStatusConfig = (status: RoundStatus) => {
  return {
    color: roundStatusStyles[status] || "bg-gray-100 text-black",
    label: roundStatusLabels[status] || status,
  };
};
