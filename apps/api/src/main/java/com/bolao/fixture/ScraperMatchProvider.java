package com.bolao.fixture;

import com.bolao.round.entities.Match;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class ScraperMatchProvider {

  private final ObjectMapper objectMapper;

  @Value("${scraper.data.path:apps/api/src/main/resources/data/fixtures.json}")
  private String dataPath;

  public List<Match> fetchMatchesByRound(String roundNumber) {
    log.info("Loading matches for round {} from scraped data", roundNumber);
    try {
      File file = new File(dataPath);
      if (!file.exists()) {
        log.warn("Scraped data file not found at: {}", dataPath);
        return Collections.emptyList();
      }

      Map<String, List<Match>> allFixtures = objectMapper.readValue(file,
          new TypeReference<Map<String, List<Match>>>() {
          });
      List<Match> matches = allFixtures.get(roundNumber);

      if (matches == null || matches.isEmpty()) {
        log.warn("No matches found for round number: {} in file. Available rounds: {}", roundNumber,
            allFixtures.keySet());
        return Collections.emptyList();
      }

      log.info("Successfully loaded {} matches for round {}", matches.size(), roundNumber);
      return matches;

    } catch (Exception e) {
      log.error("Failed to load scraped data: {}", e.getMessage(), e);
      return Collections.emptyList();
    }
  }

  public List<String> fetchAvailableRounds() {
    try {
      File file = new File(dataPath);
      if (!file.exists())
        return Collections.emptyList();

      Map<String, Object> allFixtures = objectMapper.readValue(file, new TypeReference<Map<String, Object>>() {
      });
      return allFixtures.keySet().stream().sorted().collect(Collectors.toList());
    } catch (Exception e) {
      log.error("Failed to fetch available rounds: {}", e.getMessage());
      return Collections.emptyList();
    }
  }
}
