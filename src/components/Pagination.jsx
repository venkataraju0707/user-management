import React from 'react';

const Pagination = ({ pagination, onPaginationChange, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pagination.limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPaginationChange({ ...pagination, page });
    }
  };

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${pagination.page === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="pagination-btn"
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === totalPages}
        className="pagination-btn"
      >
        Next
      </button>

      <span className="pagination-info">
        Page {pagination.page} of {totalPages} ({totalItems} total users)
      </span>
    </div>
  );
};

export default Pagination;