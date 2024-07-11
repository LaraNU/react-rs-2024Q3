import type { FormEvent, ChangeEvent } from "react";
import { Component } from "react";
import { libraryApi } from "../../api/libraryApi";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import styles from "./Search.module.css";

type Book = {
  key: string;
  title: string;
  author_name: Array<string>;
};

type State = {
  q: string;
  fields: Array<string>;
  limit: number;
  page: number;
  name: string;
  books: Array<Book>;
  searchValue: string;
  loaded: boolean;
  keyBooks: string;
  localStorageData: string;
};

export default class Search extends Component<unknown, State> {
  state: State = {
    q: "",
    fields: [],
    limit: 10,
    page: 1,

    name: "books",
    books: [],
    searchValue: "",
    loaded: false,
    keyBooks: "",
    localStorageData: "",
  };

  componentDidMount(): void {
    const valueFromLocalStorage = localStorage.getItem("lastSearch");

    if (valueFromLocalStorage) {
      this.loadDataBooks(valueFromLocalStorage);
      this.setState({ localStorageData: valueFromLocalStorage });
    } else {
      libraryApi.getBooks("harry").then((data) => {
        this.setState({
          q: data.q,
          books: data.docs,
          loaded: true,
          keyBooks: data.q,
        });
      });
    }
  }

  componentDidUpdate(_: unknown, prevState: State) {
    if (this.state.q !== prevState.q) {
      this.loadDataBooks(this.state.q);
    }
  }

  loadDataBooks = (searchValueLS: string) => {
    libraryApi.getBooks(searchValueLS).then((data) => {
      this.setState({
        q: data.q,
        books: data.docs,
        loaded: true,
        keyBooks: data.q,
      });

      localStorage.setItem("lastSearch", data.q);
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
                defaultValue={this.state.localStorageData}
              />
              <button type="submit" className="searchFieldBtn" value="search">
                search
              </button>
            </form>
          </div>
        </header>
        <Error />
        <div className={styles.secondBlock}>
          {!this.state.loaded ? <Loader /> : false}
          <ul>
            {this.state.books.map((book) => (
              <li key={book.key}>
                Title: <b>{book.title}</b> <br></br> Authors: {book.author_name}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
