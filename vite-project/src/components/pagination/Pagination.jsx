import style from "./Pagination.module.css"

const Pagination = ({ currentPage, totalPages, prevPage, nextPage }) => {
  return (
    <div className={style.pagination}>
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
