-- Seed Script for Bolão Database
-- Run this after the tables are created by JPA

-- Clear existing data (in correct order due to foreign keys)
DELETE FROM predictions;
DELETE FROM bets;
DELETE FROM matches;
DELETE FROM rounds;

-- =============================================
-- ROUND 1: Active Round (OPEN)
-- =============================================
INSERT INTO rounds (id, title, external_round_id, status, start_date, end_date, total_tickets, prize_pool, created_at)
VALUES (1, 'Brasileirão Série A - Round 1', '1058', 'OPEN', NOW(), NOW() + INTERVAL '7 days', 45, 450000, NOW());

-- Matches for Round 1 (upcoming matches)
INSERT INTO matches (id, round_id, home_team, home_team_logo, home_score, away_team, away_team_logo, away_score, kickoff_time, status)
VALUES
  (101, 1, 'Flamengo', 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_braz_logo.svg', NULL, 'Palmeiras', 'https://upload.wikimedia.org/wikipedia/pt/0/02/Escudo_Sociedade_Esportiva_Palmeiras.png', NULL, NOW() + INTERVAL '2 days', 'SCHEDULED'),
  (102, 1, 'Corinthians', 'https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png', NULL, 'São Paulo', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg', NULL, NOW() + INTERVAL '2 days', 'SCHEDULED'),
  (103, 1, 'Santos', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png', NULL, 'Grêmio', 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Gremio_Logo.svg', NULL, NOW() + INTERVAL '3 days', 'SCHEDULED'),
  (104, 1, 'Internacional', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Internacional.svg', NULL, 'Atlético-MG', 'https://upload.wikimedia.org/wikipedia/commons/2/27/Clube_Atl%C3%A9tico_Mineiro_logo.svg', NULL, NOW() + INTERVAL '3 days', 'SCHEDULED'),
  (105, 1, 'Botafogo', 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Botafogo_de_Futebol_e_Regatas_logo.svg', NULL, 'Fluminense', 'https://upload.wikimedia.org/wikipedia/commons/6/67/Fluminense_fc_logo.svg', NULL, NOW() + INTERVAL '4 days', 'SCHEDULED');

-- Bets for Round 1
INSERT INTO bets (id, round_id, name, phone, ticket_code, points, created_at)
VALUES
  (1, 1, 'João Silva', '11999998888', '1-001', 0, NOW()),
  (2, 1, 'Maria Santos', '11999997777', '1-002', 0, NOW()),
  (3, 1, 'Pedro Oliveira', '11999996666', '1-003', 0, NOW()),
  (4, 1, 'Ana Costa', '11999995555', '1-004', 0, NOW()),
  (5, 1, 'Carlos Lima', '11999994444', '1-005', 0, NOW());

-- Predictions for Bets in Round 1
INSERT INTO predictions (bet_id, match_id, home_score, away_score)
VALUES
  -- João Silva's predictions
  (1, 101, 2, 1), (1, 102, 1, 1), (1, 103, 0, 2), (1, 104, 1, 0), (1, 105, 2, 2),
  -- Maria Santos's predictions
  (2, 101, 3, 0), (2, 102, 2, 0), (2, 103, 1, 1), (2, 104, 2, 2), (2, 105, 1, 0),
  -- Pedro Oliveira's predictions
  (3, 101, 1, 2), (3, 102, 0, 1), (3, 103, 2, 1), (3, 104, 0, 0), (3, 105, 3, 1),
  -- Ana Costa's predictions
  (4, 101, 2, 2), (4, 102, 1, 0), (4, 103, 0, 0), (4, 104, 1, 1), (4, 105, 2, 1),
  -- Carlos Lima's predictions
  (5, 101, 0, 1), (5, 102, 2, 2), (5, 103, 1, 0), (5, 104, 3, 1), (5, 105, 0, 0);

-- =============================================
-- ROUND 2: Closed Round (with results)
-- =============================================
INSERT INTO rounds (id, title, external_round_id, status, start_date, end_date, total_tickets, prize_pool, created_at)
VALUES (2, 'Brasileirão Série A - Round 38', '1057', 'CLOSED', NOW() - INTERVAL '14 days', NOW() - INTERVAL '7 days', 127, 1270000, NOW() - INTERVAL '14 days');

-- Matches for Round 2 (with final scores)
INSERT INTO matches (id, round_id, home_team, home_team_logo, home_score, away_team, away_team_logo, away_score, kickoff_time, status)
VALUES
  (201, 2, 'Corinthians', 'https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png', 2, 'Palmeiras', 'https://upload.wikimedia.org/wikipedia/pt/0/02/Escudo_Sociedade_Esportiva_Palmeiras.png', 1, NOW() - INTERVAL '10 days', 'FINISHED'),
  (202, 2, 'Flamengo', 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_braz_logo.svg', 3, 'Vasco', 'https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png', 0, NOW() - INTERVAL '10 days', 'FINISHED'),
  (203, 2, 'São Paulo', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg', 1, 'Santos', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png', 1, NOW() - INTERVAL '9 days', 'FINISHED'),
  (204, 2, 'Grêmio', 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Gremio_Logo.svg', 0, 'Internacional', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Internacional.svg', 2, NOW() - INTERVAL '9 days', 'FINISHED'),
  (205, 2, 'Atlético-MG', 'https://upload.wikimedia.org/wikipedia/commons/2/27/Clube_Atl%C3%A9tico_Mineiro_logo.svg', 4, 'Cruzeiro', 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_Cruzeiro_1921.png', 2, NOW() - INTERVAL '8 days', 'FINISHED');

-- Bets for Round 2 (with calculated points)
INSERT INTO bets (id, round_id, name, phone, ticket_code, points, created_at)
VALUES
  (101, 2, 'Lucas Mendes', '11988881111', '2-001', 12, NOW() - INTERVAL '14 days'),
  (102, 2, 'Fernanda Souza', '11988882222', '2-002', 10, NOW() - INTERVAL '14 days'),
  (103, 2, 'Ricardo Alves', '11988883333', '2-003', 9, NOW() - INTERVAL '14 days'),
  (104, 2, 'Juliana Pereira', '11988884444', '2-004', 8, NOW() - INTERVAL '14 days'),
  (105, 2, 'Bruno Costa', '11988885555', '2-005', 7, NOW() - INTERVAL '14 days'),
  (106, 2, 'Camila Silva', '11988886666', '2-006', 6, NOW() - INTERVAL '14 days'),
  (107, 2, 'Diego Santos', '11988887777', '2-007', 5, NOW() - INTERVAL '14 days'),
  (108, 2, 'Patrícia Lima', '11988888888', '2-008', 4, NOW() - INTERVAL '14 days');

-- Predictions for Round 2 (some exact, some correct winner)
INSERT INTO predictions (bet_id, match_id, home_score, away_score)
VALUES
  -- Lucas Mendes (12 pts - 4 exact scores)
  (101, 201, 2, 1), (101, 202, 3, 0), (101, 203, 1, 1), (101, 204, 0, 2), (101, 205, 3, 2),
  -- Fernanda Souza (10 pts)
  (102, 201, 2, 1), (102, 202, 2, 0), (102, 203, 1, 1), (102, 204, 1, 2), (102, 205, 4, 2),
  -- Ricardo Alves (9 pts)
  (103, 201, 3, 1), (103, 202, 3, 0), (103, 203, 0, 0), (103, 204, 0, 2), (103, 205, 3, 1),
  -- Juliana Pereira (8 pts)
  (104, 201, 1, 0), (104, 202, 3, 0), (104, 203, 1, 1), (104, 204, 1, 3), (104, 205, 2, 1),
  -- Bruno Costa (7 pts)
  (105, 201, 2, 0), (105, 202, 2, 1), (105, 203, 2, 2), (105, 204, 0, 2), (105, 205, 2, 0),
  -- Camila Silva (6 pts)
  (106, 201, 1, 1), (106, 202, 3, 0), (106, 203, 0, 1), (106, 204, 1, 1), (106, 205, 3, 2),
  -- Diego Santos (5 pts)
  (107, 201, 0, 2), (107, 202, 2, 0), (107, 203, 2, 1), (107, 204, 0, 1), (107, 205, 4, 2),
  -- Patrícia Lima (4 pts)
  (108, 201, 1, 2), (108, 202, 1, 0), (108, 203, 1, 1), (108, 204, 2, 2), (108, 205, 5, 3);

-- =============================================
-- ROUND 3: Another Closed Round
-- =============================================
INSERT INTO rounds (id, title, external_round_id, status, start_date, end_date, total_tickets, prize_pool, created_at)
VALUES (3, 'Brasileirão Série A - Round 37', '1056', 'CLOSED', NOW() - INTERVAL '21 days', NOW() - INTERVAL '14 days', 98, 980000, NOW() - INTERVAL '21 days');

-- Matches for Round 3
INSERT INTO matches (id, round_id, home_team, home_team_logo, home_score, away_team, away_team_logo, away_score, kickoff_time, status)
VALUES
  (301, 3, 'Palmeiras', 'https://upload.wikimedia.org/wikipedia/pt/0/02/Escudo_Sociedade_Esportiva_Palmeiras.png', 1, 'Flamengo', 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_braz_logo.svg', 0, NOW() - INTERVAL '17 days', 'FINISHED'),
  (302, 3, 'São Paulo', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg', 2, 'Corinthians', 'https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png', 2, NOW() - INTERVAL '17 days', 'FINISHED'),
  (303, 3, 'Santos', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png', 3, 'Botafogo', 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Botafogo_de_Futebol_e_Regatas_logo.svg', 1, NOW() - INTERVAL '16 days', 'FINISHED'),
  (304, 3, 'Fluminense', 'https://upload.wikimedia.org/wikipedia/commons/6/67/Fluminense_fc_logo.svg', 0, 'Grêmio', 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Gremio_Logo.svg', 0, NOW() - INTERVAL '16 days', 'FINISHED'),
  (305, 3, 'Cruzeiro', 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_Cruzeiro_1921.png', 1, 'Internacional', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Internacional.svg', 2, NOW() - INTERVAL '15 days', 'FINISHED');

-- Some bets for Round 3
INSERT INTO bets (id, round_id, name, phone, ticket_code, points, created_at)
VALUES
  (201, 3, 'André Martins', '11977771111', '3-001', 11, NOW() - INTERVAL '21 days'),
  (202, 3, 'Beatriz Rocha', '11977772222', '3-002', 9, NOW() - INTERVAL '21 days'),
  (203, 3, 'Gustavo Nunes', '11977773333', '3-003', 8, NOW() - INTERVAL '21 days'),
  (204, 3, 'Helena Dias', '11977774444', '3-004', 7, NOW() - INTERVAL '21 days'),
  (205, 3, 'Igor Ribeiro', '11977775555', '3-005', 6, NOW() - INTERVAL '21 days');

-- Predictions for Round 3
INSERT INTO predictions (bet_id, match_id, home_score, away_score)
VALUES
  -- André Martins (11 pts)
  (201, 301, 1, 0), (201, 302, 2, 2), (201, 303, 3, 1), (201, 304, 0, 0), (201, 305, 0, 1),
  -- Beatriz Rocha (9 pts)
  (202, 301, 2, 0), (202, 302, 2, 2), (202, 303, 2, 0), (202, 304, 0, 0), (202, 305, 1, 2),
  -- Gustavo Nunes (8 pts)
  (203, 301, 1, 0), (203, 302, 1, 1), (203, 303, 3, 1), (203, 304, 1, 1), (203, 305, 2, 3),
  -- Helena Dias (7 pts)
  (204, 301, 1, 1), (204, 302, 2, 2), (204, 303, 2, 1), (204, 304, 0, 0), (204, 305, 0, 0),
  -- Igor Ribeiro (6 pts)
  (205, 301, 0, 1), (205, 302, 3, 2), (205, 303, 3, 1), (205, 304, 1, 0), (205, 305, 1, 2);

-- Reset sequences
SELECT setval('rounds_id_seq', (SELECT MAX(id) FROM rounds));
SELECT setval('bets_id_seq', (SELECT MAX(id) FROM bets));
SELECT setval('predictions_id_seq', (SELECT MAX(id) FROM predictions));

-- Summary
DO $$
BEGIN
  RAISE NOTICE 'Seed completed!';
  RAISE NOTICE 'Created: 3 rounds, 15 matches, 18 bets, 90 predictions';
END $$;
