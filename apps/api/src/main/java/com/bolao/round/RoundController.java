package com.bolao.round;

import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Round;
import com.bolao.round.usecases.GetRoundByIdUseCase;
import com.bolao.round.usecases.GetRoundByExternalIdUseCase;
import com.bolao.round.usecases.GetRoundRankingUseCase;
import com.bolao.round.usecases.ListRoundsUseCase;
import com.bolao.round.usecases.UpdateRoundUseCase;
import com.bolao.shared.dtos.ApiResponse;
import com.bolao.shared.entities.ResultEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rounds")
@RequiredArgsConstructor
public class RoundController {

  private final ListRoundsUseCase listRoundsUseCase;
  private final GetRoundByIdUseCase getRoundByIdUseCase;
  private final GetRoundByExternalIdUseCase getRoundByExternalIdUseCase;
  private final GetRoundRankingUseCase getRoundRankingUseCase;
  private final UpdateRoundUseCase updateRoundUseCase;

  @PatchMapping("/{id}")
  public ResponseEntity<ApiResponse<Round>> update(
      @PathVariable Long id,
      @RequestBody java.util.Map<String, Object> body) {

    java.time.LocalDateTime endDate = null;
    if (body.containsKey("endDate") && body.get("endDate") != null) {
      endDate = java.time.LocalDateTime.parse(body.get("endDate").toString());
    }

    return ResponseEntity.ok(ApiResponse.ok(updateRoundUseCase.execute(id, endDate)));
  }

  @GetMapping
  public ResponseEntity<ApiResponse<List<Round>>> findAll(
      @RequestParam(required = false) Round.Status status,
      @RequestParam(required = false) Integer limit) {
    return ResponseEntity.ok(ApiResponse.ok(listRoundsUseCase.execute(status, limit)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<Round>> findById(@PathVariable Long id) {
    return ResponseEntity.ok(ApiResponse.ok(getRoundByIdUseCase.execute(id)));
  }

  @GetMapping("/external/{externalId}")
  public ResponseEntity<ApiResponse<Round>> findByExternalId(@PathVariable String externalId) {
    return ResponseEntity.ok(ApiResponse.ok(getRoundByExternalIdUseCase.execute(externalId)));
  }

  @GetMapping("/external/{externalId}/ranking")
  public ResponseEntity<ApiResponse<ResultEntity<RankingDto>>> getRankingByExternalId(
      @PathVariable String externalId,
      @RequestParam(required = false) String search,
      @RequestParam(required = false) Integer minPoints,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "50") int size) {
    Round round = getRoundByExternalIdUseCase.execute(externalId);
    PageRequest pageable = PageRequest.of(page, size, Sort.by("points").descending());
    return ResponseEntity
        .ok(ApiResponse.ok(getRoundRankingUseCase.execute(round.getId(), search, minPoints, pageable)));
  }

  @GetMapping("/{id}/ranking")
  public ResponseEntity<ApiResponse<ResultEntity<RankingDto>>> getRanking(
      @PathVariable Long id,
      @RequestParam(required = false) String search,
      @RequestParam(required = false) Integer minPoints,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "50") int size) {
    PageRequest pageable = PageRequest.of(page, size, Sort.by("points").descending());
    return ResponseEntity.ok(ApiResponse.ok(getRoundRankingUseCase.execute(id, search, minPoints, pageable)));
  }
}
