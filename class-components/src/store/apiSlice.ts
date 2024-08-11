import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BOOKS_LIMIT = "9";
const BOOK_LIMIT = "1";
const BOOK_PAGE = "1";

const urlSearchParamsBooks = new URLSearchParams({
  fields: "title,author_name,key,availability,cover_i",
  limit: BOOKS_LIMIT,
});

const urlSearchParamsBook = new URLSearchParams({
  fields:
    "title,author_name,key,cover_i,first_sentence,first_publish_year,availability",
  limit: BOOK_LIMIT,
  page: BOOK_PAGE,
});

const baseUrl = "https://openlibrary.org/search.json";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ q, page }) =>
        `?q=${q}&${urlSearchParamsBooks.toString()}&page=${page}`,
    }),
    getBook: builder.query({
      query: (title: string) =>
        `?title=${title}&lang=uk&${urlSearchParamsBook.toString()}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery } = apiSlice;

export default apiSlice;
