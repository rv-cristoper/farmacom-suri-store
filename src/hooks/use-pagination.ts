import { useEffect, useState } from "react";

export interface IPagination {
  handlePageChange: (page: number, validate: boolean) => void;
  handleItemsPerPageChange: (take: number) => void;
  resetPagination: () => void;
  pageRange: number[];
  totalPages: number;
  filterPagination: {
    page: number;
    take: number;
  };
}

export const usePagination = (totalItems: number): IPagination => {
  const initialState = {
    page: 1,
    take: 10,
  };
  const [filterPagination, setFilterPagination] = useState(initialState);
  const [totalPages, setTotalPages] = useState<number>(0);
  const maxPagesToShow = 4;

  const handlePageChange = (page: number, validate: boolean) => {
    if (!validate || page === filterPagination.page) return;
    setFilterPagination({ ...filterPagination, page });
  };

  const handleItemsPerPageChange = (take: number) => {
    if (take === filterPagination.take) return;
    setFilterPagination({ take, page: 1 });
  };

  const resetPagination = () => setFilterPagination(initialState);

  const startPage = Math.max(
    1,
    Math.min(
      filterPagination.page - Math.floor(maxPagesToShow / 2),
      totalPages - maxPagesToShow + 1
    )
  );
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const pageRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / filterPagination.take));
  }, [totalItems, filterPagination.take]);

  return {
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination,
    pageRange,
    totalPages,
    filterPagination,
  };
};
