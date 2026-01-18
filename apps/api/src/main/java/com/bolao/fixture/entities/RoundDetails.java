package com.bolao.fixture.entities;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class RoundDetails {
  private String name;
  private List<String> dates;
}
