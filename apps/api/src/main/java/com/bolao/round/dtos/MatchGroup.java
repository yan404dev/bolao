package com.bolao.round.dtos;

import com.bolao.round.entities.Match;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchGroup {
  private String date; // Formato yyyy-MM-dd
  private String formattedDate; // Ex: "28 DE JANEIRO"
  private List<Match> matches;
}
