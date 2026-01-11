package com.bolao.fixture.entities;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class League {
  private Integer id;
  private String name;
  private String logo;
  private String country;
}
