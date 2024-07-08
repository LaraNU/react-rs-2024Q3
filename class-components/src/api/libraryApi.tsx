const urlSearchParamsBooks = new URLSearchParams({
  fields: "title,author_name,key",
  page: `${1}`,
  limit: `${10}`,
});

export const libraryApi = {
  async getBooks(q: string) {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${q}&${urlSearchParamsBooks.toString()}`,
    );
    const books = await response.json();
    return books;
  },
};
