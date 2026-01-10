package com.bolao.shared.config;

import com.bolao.shared.dtos.ApiResponse;
import com.bolao.shared.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ApiResponse<Void>> handleBadRequest(IllegalArgumentException e) {
    log.warn("Bad request: {}", e.getMessage());
    return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
  }

  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<ApiResponse<Void>> handleConflict(IllegalStateException e) {
    log.warn("Conflict: {}", e.getMessage());
    return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.error(e.getMessage()));
  }

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ApiResponse<Void>> handleNotFound(NotFoundException e) {
    log.warn("Not found: {}", e.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(e.getMessage()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException e) {
    String message = e.getBindingResult().getFieldErrors().stream()
        .map(err -> err.getField() + ": " + err.getDefaultMessage())
        .reduce((a, b) -> a + "; " + b)
        .orElse("Validation error");
    log.warn("Validation error: {}", message);
    return ResponseEntity.badRequest().body(ApiResponse.error(message));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse<Void>> handleGeneric(Exception e) {
    log.error("Unexpected error: {}", e.getMessage(), e);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error("Internal server error"));
  }
}
