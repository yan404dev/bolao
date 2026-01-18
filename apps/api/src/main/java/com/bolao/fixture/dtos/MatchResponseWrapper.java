package com.bolao.fixture.dtos;

import com.bolao.round.entities.Match;
import com.bolao.fixture.entities.RoundDetails;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MatchResponseWrapper {
  private final List<Match> matches;
  private final String championshipName;
  private final String championshipLogo;
  private final List<RoundDetails> roundDetails;
}
