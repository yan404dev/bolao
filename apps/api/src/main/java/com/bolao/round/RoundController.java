package com.bolao.round;

import com.bolao.round.dtos.CreateRoundDto;
import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Round;
import com.bolao.shared.dtos.ApiResponse;
import com.bolao.shared.entities.ResultEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    Round round = roundService.create(dto.getTitle(), dto.getExternalRoundId(), dto.getTicketPrice());
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(round));
  }

  @GetMapping
  public ResponseEntity<ApiResponse<List<Round>>> findAll(
      @RequestParam(required = false) Round.Status status) {
    return ResponseEntity.ok(ApiResponse.ok(roundService.findAll(status)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<Round>> findById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(roundService.findById(id)));
  }

  @GetMapping("/{id}/ranking")
  public ResponseEntity<ApiResponse<ResultEntity<RankingDto>>> getRanking(
      @PathVariable Long id,
      @RequestParam(required = false) String search,
      @RequestParam(required = false) Integer minPoints,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "50") int size) {
    PageRequest pageable = PageRequest.of(page, size, Sort.by("points").descending());
    return ResponseEntity.ok(ApiResponse.ok(roundService.getRanking(id, search, minPoints, pageable)));
  }

  @PostMapping("/{id}/calculate")
  public ResponseEntity<ApiResponse<String>> calculateScores(@PathVariable Long id) {
    Round round = roundService.findById(id);
    roundService.calculateScores(id, round.getExternalRoundId());
    return ResponseEntity.ok(ApiResponse.ok("Scores calculated successfully"));
  }

  @GetMapping("/calendar")
  public ResponseEntity<ApiResponse<List<String>>> getCalendar() {
    return ResponseEntity.ok(ApiResponse.ok(roundService.getExternalCalendar()));
  }
}
