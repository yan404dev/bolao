-- Migrate old ticket price (10.0) to new standard (12.0) for existing rounds
UPDATE rounds
SET ticket_price = 12.0
WHERE (ticket_price = 10.0 OR ticket_price IS NULL)
AND accumulated = FALSE;

UPDATE rounds
SET ticket_price = 25.0
WHERE (ticket_price = 20.0 OR ticket_price IS NULL)
AND accumulated = TRUE;
