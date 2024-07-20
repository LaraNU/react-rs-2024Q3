import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { libraryApi } from "../../api/libraryApi";
import Loader from "../../components/Loader/Loader";
import ErrorBtn from "../../components/ErrorBtn/ErrorBtn";
import BookItem from "../../components/BookItem/BookItem";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./SearchPage.module.css";

type Book = {
  key: string | "not";
  title: string | "not";
  author_name: Array<string> | ["not"];
  cover_i: number;
};

const SearchPage = () => {
  const limitPage = 9;

  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Array<Book>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [numFoundPages, setNumFound] = useState(0);
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [numLinks, setNumLinks] = useState<Array<number>>([]);

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem("lastSearch");

    if (valueFromLocalStorage) {
      loadDataBooks(valueFromLocalStorage, page);
    } else if (valueFromLocalStorage === null) {
      loadDataBooks("harry", page);
    }

    countNumbersPages(numFoundPages, Number(page));
  }, [page, numFoundPages]);

  const countNumbersPages = (numPages: number, currPage: number) => {
    const pagesNumber = [];
    const minNumOfPages = 3;

    let startPage = 1;
    if (currPage + minNumOfPages >= numPages && numPages > minNumOfPages) {
      startPage = numPages - minNumOfPages;
    } else {
      startPage = currPage;
    }

    for (let i = startPage; i <= numPages; i++) {
      pagesNumber.push(i);
    }

    setNumLinks(pagesNumber);
  };

  const loadDataBooks = (searchValueLS: string, page: string) => {
    setLoaded(false);
    libraryApi.getBooks(searchValueLS, page).then((data) => {
      setBooks(data.docs);
      setLoaded(true);
      setNumFound(Math.ceil(data.numFound / limitPage));
    });
  };

  const handleSearchValueSubmit = (value: string) => {
    setPage("1");
    loadDataBooks(value, "1");
    setSearchParams({ page: "1" });
    localStorage.setItem("lastSearch", value);
  };

  const handlePage = (num: number) => {
    setPage(num.toString());
    setSearchParams({ page: num.toString() });
  };

  return (
    <div className={styles.wrapper}>
      <Header onSubmit={handleSearchValueSubmit} />
      <ErrorBtn />
      {!loaded ? <Loader /> : null}
      <div className={styles.secondBlock}>
        {books.map((book) => (
          <BookItem
            post={{
              title: book.title,
              author_name: book.author_name,
            }}
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            key={book.key}
            alt={book.title}
          />
        ))}
      </div>
      <Pagination
        onCurrentNum={handlePage}
        numLinks={numLinks}
        currentPage={page}
      />
      <Footer />
    </div>
  );
};

export default SearchPage;
