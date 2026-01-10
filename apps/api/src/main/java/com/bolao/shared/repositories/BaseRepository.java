package com.bolao.shared.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface BaseRepository<T, ID> {

  T save(T entity);

  List<T> saveAll(Iterable<T> entities);

  Optional<T> findById(ID id);

  List<T> findAll();

  void delete(T entity);

  void deleteById(ID id);

  void deleteAll(Iterable<T> entities);

  Page<T> findAll(Pageable pageable);

  Page<T> findAll(Specification<T> spec, Pageable pageable);

  long count();

  boolean existsById(ID id);
}
