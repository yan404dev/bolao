package com.bolao.bet;

import com.bolao.bet.dtos.CreateBetDto;
import com.bolao.bet.entities.Bet;
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

  private final BetService betService;

  @PostMapping
  public ResponseEntity<ApiResponse<Bet>> create(@Valid @RequestBody CreateBetDto dto) {
    Bet bet = betService.create(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(bet));
  }

  @GetMapping("/{ticketCode}")
  public ResponseEntity<ApiResponse<Bet>> findByTicketCode(@PathVariable String ticketCode) {
    return betService.findByTicketCode(ticketCode)
        .map(bet -> ResponseEntity.ok(ApiResponse.ok(bet)))
        .orElse(ResponseEntity.notFound().build());
  }
}
