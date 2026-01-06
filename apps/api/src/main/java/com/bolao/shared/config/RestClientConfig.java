package com.bolao.shared.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

  @Bean
  public RestClient footballApiClient(
      @Value("${football.api.url:https://server-api.top/api}") String baseUrl) {
    return RestClient.builder()
        .baseUrl(baseUrl)
        .build();
  }
}
