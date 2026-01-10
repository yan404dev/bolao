package com.bolao.fixture;

import com.bolao.fixture.usecases.FetchExternalMatchesUseCase;
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

  private final FetchExternalMatchesUseCase fetchExternalMatchesUseCase;

  @GetMapping
  public ResponseEntity<ApiResponse<List<Match>>> getFixtures(@RequestParam String roundId) {
    return ResponseEntity.ok(ApiResponse.ok(fetchExternalMatchesUseCase.execute(roundId)));
  }
}
