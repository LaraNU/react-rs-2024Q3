import type { FormEvent, ChangeEvent } from "react";
import { Component } from "react";
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
  size: number;
  books: Array<Book>;
  searchValue: string;
};

export default class Search extends Component<unknown, State> {
  state: State = {
    q: "",
    fields: [],
    limit: 10,
    page: 1,

    name: "books",
    size: 0,
    books: [],
    searchValue: "",
  };

  componentDidMount(): void {
    const urlSearchParams = new URLSearchParams({
      q: this.state.q,
      lang: "uk",
      fields: "title,author_name,key",
      page: `${1}`,
      limit: `${10}`,
    });

    fetch(`https://openlibrary.org/search.json?${urlSearchParams.toString()}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          books: data.docs,
          size: data.docs.length,
        });
      });
  }

  componentDidUpdate(_: unknown, prevState: State) {
    if (this.state.q !== prevState.q) {
      this.componentDidMount();
    }
  }

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
              />
              <button type="submit" className="searchFieldBtn" value="search">
                search
              </button>
            </form>
          </div>
        </header>
        <div className={styles.secondBlock}>
          <ul>
            {this.state.books.map((book) => (
              <li key={book.key}>
                {book.title} {book.author_name}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
