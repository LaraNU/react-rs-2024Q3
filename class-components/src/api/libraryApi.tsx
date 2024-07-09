const urlSearchParamsBooks = new URLSearchParams({
  fields: "title,author_name,key,isbn,availability",
  page: `${1}`,
  limit: `${9}`,
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
