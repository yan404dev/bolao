package com.bolao.shared.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultEntity<T> {
  private List<T> items;
  private long totalItems;
  private int totalPages;
  private int currentPage;
}
