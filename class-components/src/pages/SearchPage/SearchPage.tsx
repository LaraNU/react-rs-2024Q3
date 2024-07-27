import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { libraryApi } from "../../api/libraryApi";
import Loader from "../../components/Loader/Loader";
import ErrorBtn from "../../components/ErrorBtn/ErrorBtn";
import BookItem from "../../components/BookItem/BookItem";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Pagination from "@/components/Pagination/Pagination";
import BookDetails from "@/components/BookDetails/BookDetails";
import styles from "./SearchPage.module.css";

import { useDispatch } from "react-redux";
import { openCardSlice } from "@/store/cardStatusSlice";

type Book = {
  key: string | "not";
  title: string | "not";
  author_name: Array<string> | ["not"];
  cover_i: number;
};

type DetailedBook = {
  key: string | "not";
  title: string | "not";
  author_name: Array<string> | ["not"];
  cover_i: number;
  first_sentence: Array<string>;
  first_publish_year: number;
};

const SearchPage = () => {
  const limitPage = 9;
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Array<Book>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [numFoundPages, setNumFound] = useState(0);
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [numLinks, setNumLinks] = useState<Array<number>>([]);

  const [book, setBook] = useState<Array<DetailedBook>>([]);
  const [openCard, setOpenCard] = useState(false);

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

  const handleValueBookItem = (title: string) => {
    setLoaded(false);
    libraryApi.getBook(title).then((data) => {
      setBook(data.docs);
      setLoaded(true);
      setOpenCard(true);
      dispatch(openCardSlice(openCard));
    });
    setSearchParams({ page: page, book: title });
  };

  return (
    <div className={styles.wrapper}>
      <Header onSubmit={handleSearchValueSubmit} />
      <ErrorBtn />
      {!loaded ? <Loader /> : null}
      <div className={styles.secondBlockWrapper}>
        <div className={styles.secondBlock}>
          {books.map((book) => (
            <BookItem
              onClickFun={() => handleValueBookItem(book.title)}
              data-book={book.title}
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
        {book.map(
          (book) =>
            openCard && (
              <BookDetails
                post={{
                  title: book.title,
                  author_name: book.author_name,
                }}
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                key={book.key}
                alt={book.title}
                firstSentence={book.first_sentence}
                firstPublishYear={book.first_publish_year}
              />
            ),
        )}
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
