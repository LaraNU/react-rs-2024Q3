import { useState, useEffect } from "react";
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
  isbn: Array<string> | ["not"];
};

const SearchPage = () => {
  const [books, setBooks] = useState<Array<Book>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [numFound, setNumFound] = useState(0);
  // const [q, setQ] = useState("");
  const [page, setPage] = useState("1");
  const [start, setStart] = useState(0);

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem("lastSearch");

    if (valueFromLocalStorage) {
      loadDataBooks(valueFromLocalStorage, page);
    } else if (valueFromLocalStorage === null) {
      loadDataBooks("harry", page);
    }
  }, [page]);

  const loadDataBooks = (searchValueLS: string, page: string) => {
    setLoaded(false);
    libraryApi.getBooks(searchValueLS, page).then((data) => {
      setBooks(data.docs);
      setLoaded(true);
      setNumFound(data.numFound);
      setStart(data.start);
      // setQ(data.q);
      console.log(data);
    });
  };

  const handleSearchValueSubmit = (value: string) => {
    // setPage("1");
    handlePage("1");
    setStart(0);
    // loadDataBooks(value, page);
    localStorage.setItem("lastSearch", value);
  };

  const handlePage = (num: string) => {
    setPage(num);
  };

  console.log(start);

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
              author_name: book.author_name.map((author) => author + " "),
            }}
            src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0] && ""}-L.jpg`}
            key={book.isbn[0]}
            alt={book.title}
          />
        ))}
      </div>
      <Pagination
        numPage={handlePage}
        pageNumbers={Math.ceil(numFound / 9)}
        start={start}
      />
      <Footer />
    </div>
  );
};

export default SearchPage;
