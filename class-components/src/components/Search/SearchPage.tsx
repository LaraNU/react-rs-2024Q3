import { useState, useEffect } from "react";
import { libraryApi } from "../../api/libraryApi";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import BookItem from "../BookItem/BookItem";
import SearchForm from "../SearchForm/SearchForm";
import styles from "./Search.module.css";

type Book = {
  key: string | "not";
  title: string | "not";
  author_name: Array<string> | ["not"];
  isbn: Array<string> | ["not"];
};

const SearchPage = () => {
  const [q, setQ] = useState<string>("");
  // const [limit, setLimit] = useState<number>(10);
  // const [page, setPage] = useState<number>(1);
  const [books, setBooks] = useState<Array<Book>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem("lastSearch");

    if (valueFromLocalStorage) {
      loadDataBooks(valueFromLocalStorage);
    } else {
      libraryApi.getBooks("harry").then((data) => {
        setQ(data.q);
        setBooks(data.docs);
        setLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (q) {
      loadDataBooks(q);
    }
  }, [q]);

  const loadDataBooks = (searchValueLS: string) => {
    setLoaded(false);
    libraryApi.getBooks(searchValueLS).then((data) => {
      setQ(data.q);
      setBooks(data.docs);
      setLoaded(true);

      localStorage.setItem("lastSearch", data.q);
    });
  };

  const handleSearchValueSubmit = (value: string) => {
    setQ(value);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.searchField}>
          <SearchForm onSearchValueSubmit={handleSearchValueSubmit} />
        </div>
      </header>
      <Error />
      {!loaded ? <Loader /> : null}
      <div className={styles.secondBlock}>
        {books.map((book) => (
          <BookItem
            post={{
              title: book.title,
              author_name: book.author_name,
            }}
            src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`}
            key={book.isbn[0]}
          />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
