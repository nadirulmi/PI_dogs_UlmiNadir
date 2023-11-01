// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, prevPage, nextPage }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={prevPage}>
          &#8249;
        </button>
      )}
      <span>
        Página {currentPage} de {totalPages}
      </span>
      {currentPage < totalPages && (
        <button onClick={nextPage}>
          &#8250;
        </button>
      )}
    </div>
  );
};

export default Pagination;
