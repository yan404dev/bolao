-- Fix prize pool calculation by subtracting organization fees (R$ 2.00 for normal, R$ 5.00 for accumulated)
UPDATE rounds
SET prize_pool = total_tickets * 10.0
WHERE accumulated = FALSE;

UPDATE rounds
SET prize_pool = total_tickets * 20.0
WHERE accumulated = TRUE;
