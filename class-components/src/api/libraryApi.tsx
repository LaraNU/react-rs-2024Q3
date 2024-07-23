const urlSearchParamsBooks = new URLSearchParams({
  fields: "title,author_name,key,availability,cover_i",
  limit: `${9}`,
});

const urlSearchParamsBook = new URLSearchParams({
  fields:
    "title,author_name,key,cover_i,first_sentence,first_publish_year,availability",
  limit: `${1}`,
  page: `${1}`,
});

export const libraryApi = {
  async getBooks(q: string, page: string) {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${q}&${urlSearchParamsBooks.toString()}&page=${page}`,
    );
    const books = await response.json();
    return books;
  },

  async getBook(title: string) {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${title}&lang=uk&${urlSearchParamsBook.toString()}`,
    );
    const book = await response.json();
    return book;
  },
};
