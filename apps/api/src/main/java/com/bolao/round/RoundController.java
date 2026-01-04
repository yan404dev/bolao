package com.bolao.round;

import com.bolao.round.dtos.CreateRoundDto;
import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Round;
import com.bolao.shared.dtos.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rounds")
@RequiredArgsConstructor
public class RoundController {

  private final RoundService roundService;

  @PostMapping
  public ResponseEntity<ApiResponse<Round>> create(@Valid @RequestBody CreateRoundDto dto) {
    Round round = roundService.create(dto.getTitle(), dto.getExternalRoundId(), dto.getPrizePool());
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(round));
  }

  @GetMapping
  public ResponseEntity<ApiResponse<List<Round>>> findAll() {
    return ResponseEntity.ok(ApiResponse.ok(roundService.findAll()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<Round>> findById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(roundService.findById(id)));
  }

  @GetMapping("/{id}/ranking")
  public ResponseEntity<ApiResponse<List<RankingDto>>> getRanking(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(roundService.getRanking(id)));
  }

  @PostMapping("/{id}/calculate")
  public ResponseEntity<ApiResponse<String>> calculateScores(@PathVariable Long id) {
    Round round = roundService.findById(id);
    roundService.calculateScores(id, round.getExternalRoundId());
    return ResponseEntity.ok(ApiResponse.ok("Scores calculated successfully"));
  }
}
