import { Component } from "react";
import "./Search.css";
import "../App.css";

export default class Search extends Component {
  state = {
    q: "",
    fields: [],
    limit: 10,
    page: 1,

    name: "books",
    size: 0,
    list_books: [],
  };

  componentDidMount(): void {
    fetch(
      `https://openlibrary.org/search.json?q=${this.state.q}&lang=uk&fields=title,author_name,key&page=1&limit=10`,
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          list_books: data.docs,
          size: data.docs.length,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.q !== prevState.q) {
      this.componentDidMount();
    }
  }

  handleSubmit = (event) => {
    this.setState({ q: event.target[0].value });
    event.preventDefault();
  };

  render() {
    return (
      <>
        <header className="header">
          <div className="search-field">
            <form className="search-field" onSubmit={this.handleSubmit}>
              <input type="text" className="search-field-input" />
              <button type="submit" className="search-field-btn" value="search">
                search
              </button>
            </form>
          </div>
        </header>
        <div className="second-block">
          <ul>
            {this.state.list_books.map((book) => (
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
