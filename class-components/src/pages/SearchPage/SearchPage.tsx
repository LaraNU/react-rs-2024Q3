import { useState, useEffect } from "react";
import { libraryApi } from "../../api/libraryApi";
import Loader from "../../components/Loader/Loader";
import ErrorBtn from "../../components/ErrorBtn/ErrorBtn";
import BookItem from "../../components/BookItem/BookItem";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./SearchPage.module.css";

type Book = {
  key: string | "not";
  title: string | "not";
  author_name: Array<string> | ["not"];
  isbn: Array<string> | ["not"];
};

const SearchPage = () => {
  const [q, setQ] = useState<string>("");
  const [books, setBooks] = useState<Array<Book>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem("lastSearch");
    if (valueFromLocalStorage) {
      loadDataBooks(valueFromLocalStorage);
    } else {
      loadDataBooks("harry");
    }
  }, []);

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
    loadDataBooks(value);
  };

  return (
    <div className={styles.wrapper}>
      <Header onSubmit={handleSearchValueSubmit} searchVal={q} />
      <ErrorBtn />
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
            alt={book.title}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
