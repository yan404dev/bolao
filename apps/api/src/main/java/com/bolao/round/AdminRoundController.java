package com.bolao.round;

import com.bolao.fixture.entities.League;
import com.bolao.fixture.usecases.GetExternalCalendarUseCase;
import com.bolao.fixture.usecases.ListLeaguesUseCase;
import com.bolao.fixture.usecases.SyncAllRoundsUseCase;
import com.bolao.round.dtos.CreateRoundDto;
import com.bolao.round.dtos.SyncChampionshipDto;
import com.bolao.round.entities.Round;
import com.bolao.round.usecases.CreateRoundUseCase;
import com.bolao.round.usecases.ProcessRoundResultsUseCase;
import com.bolao.round.usecases.UpdateRoundStatusUseCase;
import com.bolao.shared.dtos.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin/rounds")
@RequiredArgsConstructor
public class AdminRoundController {

  private final SyncAllRoundsUseCase syncAllRoundsUseCase;
  private final ProcessRoundResultsUseCase processRoundResultsUseCase;
  private final GetExternalCalendarUseCase getExternalCalendarUseCase;
  private final CreateRoundUseCase createRoundUseCase;
  private final ListLeaguesUseCase listLeaguesUseCase;
  private final UpdateRoundStatusUseCase updateRoundStatusUseCase;

  @GetMapping("/leagues")
  public ResponseEntity<ApiResponse<List<League>>> getLeagues(
      @RequestParam(required = false, defaultValue = "Brazil") String country) {
    return ResponseEntity.ok(ApiResponse.ok(listLeaguesUseCase.execute(country)));
  }

  @PostMapping
  public ResponseEntity<ApiResponse<Round>> create(@Valid @RequestBody CreateRoundDto dto) {
    log.info("Admin request to create round: {}", dto.getTitle());
    Round round = createRoundUseCase.execute(
        dto.getTitle(),
        dto.getExternalRoundId(),
        dto.getTicketPrice(),
        dto.getLeagueId(),
        dto.getSeason());
    return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(round));
  }

  @PostMapping("/sync")
  public ResponseEntity<ApiResponse<List<Round>>> sync(@Valid @RequestBody SyncChampionshipDto dto) {
    log.info("Admin request to sync league {} season {}", dto.getLeagueId(), dto.getSeason());
    List<Round> synced = syncAllRoundsUseCase.execute(dto.getLeagueId(), dto.getSeason());
    return ResponseEntity.ok(ApiResponse.ok(synced));
  }

  @GetMapping("/calendar")
  public ResponseEntity<ApiResponse<List<String>>> getCalendar(
      @RequestParam(required = false) Integer leagueId,
      @RequestParam(required = false) Integer season) {
    log.info("Admin request to fetch calendar for league {} season {}", leagueId, season);
    return ResponseEntity.ok(ApiResponse.ok(getExternalCalendarUseCase.execute(leagueId, season)));
  }

  @PostMapping("/{id}/calculate")
  public ResponseEntity<ApiResponse<Void>> calculate(@PathVariable Long id) {
    log.info("Admin request to calculate scores for round {}", id);
    processRoundResultsUseCase.execute(id);
    return ResponseEntity.ok(ApiResponse.ok(null));
  }

  @PutMapping("/{id}/status")
  public ResponseEntity<ApiResponse<Round>> updateStatus(
      @PathVariable Long id,
      @RequestParam Round.Status status) {
    log.info("Admin request to update status of round {} to {}", id, status);
    return ResponseEntity.ok(ApiResponse.ok(updateRoundStatusUseCase.execute(id, status)));
  }
}
