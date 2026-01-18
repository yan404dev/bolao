package com.bolao.round;

import com.bolao.round.repositories.MatchRepository;
import com.bolao.shared.dtos.ApiResponse;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/matches")
@RequiredArgsConstructor
public class MatchController {

  private final MatchRepository matchRepository;

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Void>> deleteMatch(@PathVariable Long id) {
    if (!matchRepository.existsById(id)) {
      throw new NotFoundException("Match not found: " + id);
    }
    matchRepository.deleteById(id);
    return ResponseEntity.ok(ApiResponse.ok(null));
  }
}
