import type { FormEvent, ChangeEvent } from "react";
import { Component } from "react";
import styles from "./Search.module.css";

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string;
  };
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
    q: "harry",
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
      startIndex: `${0}`,
      maxResults: `${10}`,
      printType: "books",
      projection: "lite",
    });
    const query_url = `https://www.googleapis.com/books/v1/volumes?${urlSearchParams.toString()}`;
    fetch(query_url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.items);
        this.setState({
          books: data.items,
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
              <li key={book.id}>
                Title: <b>{book.volumeInfo.title}</b> <br></br> Authors:{" "}
                {book.volumeInfo.authors}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
