package com.bolao.round;

import com.bolao.round.dtos.RankingDto;
import com.bolao.round.entities.Round;
import com.bolao.round.usecases.GetRoundByIdUseCase;
import com.bolao.round.usecases.GetRoundRankingUseCase;
import com.bolao.round.usecases.ListRoundsUseCase;
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
  private final GetRoundRankingUseCase getRoundRankingUseCase;

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
