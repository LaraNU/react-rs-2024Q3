import React from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import Head from "next/head";
import { store } from "../store/store";
import "../global.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>Books</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
