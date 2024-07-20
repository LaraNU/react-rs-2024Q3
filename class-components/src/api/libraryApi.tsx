const urlSearchParamsBooks = new URLSearchParams({
  fields: "title,author_name,key,availability,cover_i",
  limit: `${9}`,
});

export const libraryApi = {
  async getBooks(q: string, page: string) {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${q}&${urlSearchParamsBooks.toString()}&page=${page}`,
    );
    const books = await response.json();
    return books;
  },
};
