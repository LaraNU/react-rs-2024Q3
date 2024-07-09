import type { FormEvent, ChangeEvent } from "react";
import { Component } from "react";
import { libraryApi } from "../../api/libraryApi";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import BookItem from "../BookItem/BookItem";
import styles from "./Search.module.css";

type Book = {
  key: string;
  title: string;
  author_name: Array<string>;
  isbn: Array<string>;
};

type State = {
  q: string;
  fields: Array<string>;
  limit: number;
  page: number;
  isbn: string;
  name: string;
  books: Array<Book>;
  searchValue: string;
  loaded: boolean;
  keyBooks: string;
};

export default class Search extends Component<unknown, State> {
  state: State = {
    q: "harry",
    fields: [],
    limit: 10,
    page: 1,
    isbn: "",

    name: "books",
    books: [],
    searchValue: "",
    loaded: false,
    keyBooks: "",
  };

  componentDidMount(): void {
    if (localStorage.length === 1) {
      const key = Object.keys(localStorage).toString();
      const dataLS = JSON.parse(localStorage.getItem(key) as string);

      if (dataLS !== null) {
        this.setState({
          q: key,
          books: dataLS,
        });
      }
    }

    if (localStorage.length === 0) {
      this.loadDataBooks();
    }
  }

  componentDidUpdate(_: unknown, prevState: State) {
    if (this.state.q !== prevState.q) {
      this.loadDataBooks();
    }
  }

  loadDataBooks = () => {
    libraryApi.getBooks(this.state.q).then((data) => {
      this.setState({
        q: data.q,
        books: data.docs,
        loaded: true,
        keyBooks: data.q,
        isbn: data.docs,
      });

      data.docs.map((el) => {
        this.setState({ isbn: el.isbn[0] });
      });

      if (localStorage.length > 1 || localStorage.length === 1) {
        localStorage.clear();
        localStorage.setItem(data.q, JSON.stringify(data.docs));
      }
      localStorage.setItem(data.q, JSON.stringify(data.docs));
    });

    this.setState({
      loaded: false,
    });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ q: this.state.searchValue.trim() });
  };

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    return (
      <>
        <header className={styles.header}>
          <div className={styles.searchField}>
            <form className={styles.searchField} onSubmit={this.handleSubmit}>
              <input
                type="text"
                className={styles.searchFieldInput}
                onChange={this.handleSearchChange}
                defaultValue={Object.keys(localStorage).toString()}
              />
              <button type="submit" className="searchFieldBtn" value="search">
                search
              </button>
            </form>
          </div>
        </header>
        <Error />
        {!this.state.loaded ? <Loader /> : false}
        <div className={styles.secondBlock}>
          {this.state.books.map((book) => (
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
  }
}
