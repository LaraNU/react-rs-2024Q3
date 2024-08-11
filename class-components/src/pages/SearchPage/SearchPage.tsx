import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader/Loader";
import ErrorBtn from "../../components/ErrorBtn/ErrorBtn";
import BookItem from "../../components/BookItem/BookItem";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Pagination from "../../components/Pagination/Pagination";
import BookDetails from "../../components/BookDetails/BookDetails";
import styles from "./SearchPage.module.css";

import { useDispatch } from "react-redux";
import { openCardSlice } from "../../store/cardStatusSlice";
import { useGetBookQuery, useGetBooksQuery } from "../../store/apiSlice";

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

  const router = useRouter();
  const { page = "1", book: searchBook } = router.query;

  const [numLinks, setNumLinks] = useState<Array<number>>([]);
  const [selectedBookTitle, setSelectedBookTitle] = useState<string | null>(
    null,
  );
  const [skipBooksQuery, setSkipBooksQuery] = useState(false);

  const {
    data: books = [],
    error,
    isLoading,
  } = useGetBooksQuery(
    { q: searchBook || "harry", page },
    { skip: skipBooksQuery },
  );

  const { data: detailedBook = [] } = useGetBookQuery(selectedBookTitle || "", {
    skip: !selectedBookTitle,
  });

  const countNumbersPages = useCallback(
    (currPage: number) => {
      const pagesNumber = [];
      const minNumOfPages = 3;
      const numPagesData = Math.ceil(books.numFound / limitPage);

      let startPage = 1;
      if (
        currPage + minNumOfPages >= numPagesData &&
        numPagesData > minNumOfPages
      ) {
        startPage = numPagesData - minNumOfPages;
      } else {
        startPage = currPage;
      }

      for (let i = startPage; i <= numPagesData; i++) {
        pagesNumber.push(i);
      }

      setNumLinks(pagesNumber);
    },
    [books.numFound],
  );

  useEffect(() => {
    if (searchBook) {
      localStorage.setItem("lastSearch", searchBook as string);
    }

    countNumbersPages(Number(page));
  }, [searchBook, page, countNumbersPages]);

  const handleSearchValueSubmit = (value: string) => {
    setSkipBooksQuery(false);
    router.push({
      pathname: router.pathname,
      query: { page: "1", book: value },
    });
    localStorage.setItem("lastSearch", value);
  };

  const handlePage = (num: number) => {
    router.push({
      pathname: router.pathname,
      query: { page: num.toString(), book: searchBook },
    });
  };

  const handleValueBookItem = (title: string) => {
    setSelectedBookTitle(title);
    dispatch(openCardSlice(true));
    setSkipBooksQuery(true);
    router.push({
      pathname: router.pathname,
      query: { page, book: title },
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error</p>;

  return (
    <div className={styles.wrapper}>
      <Header onSubmit={handleSearchValueSubmit} />
      <ErrorBtn />
      {isLoading ? <Loader /> : null}
      <div className={styles.secondBlockWrapper}>
        <div className={styles.secondBlock}>
          {books.docs.map((book: Book) => (
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

        {selectedBookTitle &&
          detailedBook.docs?.map((book: DetailedBook) => (
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
          ))}
      </div>
      <Pagination
        onCurrentNum={(num) => handlePage(num)}
        numLinks={numLinks}
        currentPage={page as string}
      />
      <Footer />
    </div>
  );
};

export default SearchPage;
