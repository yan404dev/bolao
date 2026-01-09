export interface ResultEntity<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
