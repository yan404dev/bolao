package com.bolao.fixture.dtos;

import com.bolao.round.entities.Match;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MatchResponseWrapper {
  private final List<Match> matches;
  private final String championshipName;
  private final String championshipLogo;
}
