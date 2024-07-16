import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";

type PaginationProps = {
  pageNumbers: number;
  numPage: (searchName: string) => void;
  start: number;
};

const Pagination = ({ pageNumbers, numPage }: PaginationProps) => {
  const [numLinks, setNumLinks] = useState<Array<number>>([]);
  const [page, setPage] = useState(1);
  const DOTS = "...";

  useEffect(() => {
    getNumbersPages(pageNumbers);
  }, [page, pageNumbers]);

  const getNumbersPages = (pageNumbers: number) => {
    const pagesNumber = [];
    for (let i = page; i <= pageNumbers; i++) {
      pagesNumber.push(i);
    }
    console.log(page, " click");
    setNumLinks(pagesNumber);
  };

  const onClickPage = (page: number) => {
    console.log(page, "onclickpage");
    setPage(page);
    numPage(page.toString());
  };

  return (
    <div className={styles.pagination}>
      <a href="#">&laquo;</a>
      {numLinks.length < 5 &&
        numLinks.slice(0, numLinks.length).map((number, index) => (
          <a
            onClick={() => onClickPage(number)}
            className={number === page ? styles.active : ""}
            key={index}
          >
            {number}
          </a>
        ))}

      {numLinks.length > 5 &&
        numLinks.slice(0, 5).map((number, index) => (
          <a
            onClick={() => onClickPage(number)}
            className={number === page ? styles.active : ""}
            key={index}
          >
            {number}
          </a>
        ))}

      <div className={styles.dots}>{DOTS}</div>
      {numLinks.length > 5 &&
        numLinks.slice(-1).map((number, index) => (
          <a
            className={styles.link}
            onClick={() => onClickPage(number)}
            key={index}
          >
            {number}
          </a>
        ))}
      {/* {numLinks.slice(0, 5).map((number, index) => (
        <a
          onClick={() => onClickPage(number)}
          className={number === page ? styles.active : ""}
          key={index}
        >
          {number}
        </a>
      ))}
      <div className={styles.dots}>{DOTS}</div>
      {numLinks.slice(-1).map((number, index) => (
        <a
          className={styles.link}
          onClick={() => onClickPage(number)}
          key={index}
        >
          {number}
        </a>
      ))} */}
      <a href="#">&raquo;</a>
    </div>
  );
};

export default Pagination;
