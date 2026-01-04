package com.bolao.fixture;

import com.bolao.round.entities.Match;
import com.bolao.shared.dtos.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fixtures")
@RequiredArgsConstructor
public class FixtureController {

  private final FixtureService fixtureService;

  @GetMapping
  public ResponseEntity<ApiResponse<List<Match>>> getFixtures(@RequestParam String rodadaId) {
    return ResponseEntity.ok(ApiResponse.ok(fixtureService.getFixtures(rodadaId)));
  }
}
