package com.bolao.shared.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

  @Bean
  public RestClient apiFootballClient(
      @Value("${api-football.api.url:https://api-football-v1.p.rapidapi.com/v3}") String baseUrl,
      @Value("${api-football.api.key:}") String apiKey) {
    return RestClient.builder()
        .baseUrl(baseUrl)
        .defaultHeader("X-RapidAPI-Key", apiKey)
        .defaultHeader("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
        .build();
  }
}
