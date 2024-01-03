import style from "./Pagination.module.css"

const Pagination = ({ currentPage, totalPages, prevPage, nextPage }) => {
  return (
    <div className={style.pagination}>
      {currentPage > 1 && (
        <button onClick={prevPage}>
          &#8249;
        </button>
      )}
     {
  totalPages !== 0 && (
    <span>
      Página {currentPage} de {totalPages}
    </span>
  )
}
      {currentPage < totalPages && (
        <button onClick={nextPage}>
          &#8250;
        </button>
      )}
    </div>
  );
};

export default Pagination;
