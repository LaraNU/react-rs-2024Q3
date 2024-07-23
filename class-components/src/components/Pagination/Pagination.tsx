import styles from "./Pagination.module.css";

type PaginationProps = {
  numLinks: number[];
  onCurrentNum: (searchName: number) => void;
  currentPage: string;
};

const Pagination = ({
  numLinks,
  onCurrentNum,
  currentPage,
}: PaginationProps) => {
  const DOTS = "...";
  const numCurrentPage = Number(currentPage);
  const lastPage = numLinks[numLinks.length - 1];
  const minNumOfPages = 3;

  const handlePageChange = (currentPage: number) => {
    onCurrentNum(currentPage);
  };

  const handlePageChangeBack = () => {
    if (numCurrentPage > 1) {
      onCurrentNum(numCurrentPage - 1);
    }
  };

  const handlePageChangeNext = () => {
    if (numCurrentPage < lastPage) {
      onCurrentNum(numCurrentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <a
        className={numCurrentPage === 1 ? styles.nonActive : ""}
        onClick={() => handlePageChangeBack()}
        href="#"
      >
        &laquo;
      </a>
      {numLinks.length <= minNumOfPages &&
        numLinks.slice(0, numLinks.length).map((number, index) => (
          <a
            onClick={() => handlePageChange(number)}
            className={number === numCurrentPage ? styles.active : ""}
            key={index}
          >
            {number}
          </a>
        ))}

      {numLinks.length > minNumOfPages &&
        numLinks.slice(0, minNumOfPages).map((number, index) => (
          <a
            onClick={() => handlePageChange(number)}
            className={number === numCurrentPage ? styles.active : ""}
            key={index}
          >
            {number}
          </a>
        ))}

      {lastPage - numCurrentPage > minNumOfPages ? (
        <div className={styles.dots}>{DOTS}</div>
      ) : null}

      {numLinks.length > minNumOfPages &&
        numLinks.slice(-1).map((number, index) => (
          <a
            className={number === numCurrentPage ? styles.active : ""}
            onClick={() => handlePageChange(number)}
            key={index}
          >
            {number}
          </a>
        ))}
      <a
        className={numCurrentPage === lastPage ? styles.nonActive : ""}
        onClick={() => handlePageChangeNext()}
        href="#"
      >
        &raquo;
      </a>
    </div>
  );
};

export default Pagination;
