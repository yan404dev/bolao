package com.bolao.bet;

import com.bolao.bet.dtos.BetResponseDto;
import com.bolao.bet.dtos.CreateBetDto;
import com.bolao.bet.entities.Bet;
import com.bolao.bet.usecases.GetBetByCodeUseCase;
import com.bolao.bet.usecases.GetBetByIdUseCase;
import com.bolao.bet.usecases.SubmitBetUseCase;
import com.bolao.shared.dtos.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/bets")
@RequiredArgsConstructor
public class BetController {

  private final SubmitBetUseCase submitBetUseCase;
  private final GetBetByCodeUseCase getBetByCodeUseCase;
  private final GetBetByIdUseCase getBetByIdUseCase;

  @PostMapping
  public ResponseEntity<ApiResponse<BetResponseDto>> create(@Valid @RequestBody CreateBetDto dto) {
    BetResponseDto response = submitBetUseCase.execute(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(response));
  }

  @GetMapping("/{id:[0-9]+}")
  public ResponseEntity<ApiResponse<Bet>> findById(@PathVariable Long id) {
    return getBetByIdUseCase.execute(id)
        .map(bet -> ResponseEntity.ok(ApiResponse.ok(bet)))
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/code/{ticketCode}")
  public ResponseEntity<ApiResponse<Bet>> findByTicketCode(@PathVariable String ticketCode) {
    return getBetByCodeUseCase.execute(ticketCode)
        .map(bet -> ResponseEntity.ok(ApiResponse.ok(bet)))
        .orElse(ResponseEntity.notFound().build());
  }
}
