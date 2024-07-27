import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

const baseUrl = "https://openlibrary.org/search.json";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (q: string, page: string) =>
        `${baseUrl}?q=${q}&${urlSearchParamsBooks.toString()}&page=${page}`,
    }),
    getBook: builder.query({
      query: (title: string) =>
        `${baseUrl}?title=${title}&lang=uk&${urlSearchParamsBook.toString()}`,
    }),
  }),
});

export default apiSlice;
