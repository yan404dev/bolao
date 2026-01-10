package com.bolao.standings;

import com.bolao.shared.dtos.ApiResponse;
import com.bolao.standings.dtos.StandingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/standings")
@RequiredArgsConstructor
public class StandingsController {

  private final StandingsService standingsService;

  @GetMapping
  public ResponseEntity<ApiResponse<List<StandingDto>>> getStandings() {
    return ResponseEntity.ok(ApiResponse.ok(standingsService.calculateStandings()));
  }
}
