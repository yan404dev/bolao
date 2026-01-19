import { z } from "zod";

export const roundStatusSchema = z.enum(["OPEN", "LIVE", "CLOSED", "CANCELLED", "SCHEDULED", "CALCULATED"]);

export const roundFiltersSchema = z.object({
  status: roundStatusSchema.optional(),
  limit: z.number().optional(),
});

export const rankingFiltersSchema = z.object({
  search: z.string().optional(),
  minPoints: z.number().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
});

export type RoundStatus = z.infer<typeof roundStatusSchema>;
export type RoundFilters = z.infer<typeof roundFiltersSchema>;
export type RankingFilters = z.infer<typeof rankingFiltersSchema>;
