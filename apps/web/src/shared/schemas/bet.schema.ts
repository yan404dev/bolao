import { z } from "zod";

export const predictionSchema = z.object({
  matchId: z.number(),
  homeScore: z.number().int().min(0),
  awayScore: z.number().int().min(0),
});

export const createBetPayloadSchema = z.object({
  roundId: z.number(),
  name: z.string().min(3),
  phone: z.string().min(9),
  predictions: z.array(predictionSchema),
});

export type CreateBetPayload = z.infer<typeof createBetPayloadSchema>;
export type Prediction = z.infer<typeof predictionSchema>;
