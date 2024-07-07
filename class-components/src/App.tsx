// import React from "react";
import Search from "./components/search-bar/Search";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.wrapper}>
      <Search />
      <footer className={styles.footer}>foo</footer>
    </div>
  );
}

export default App;
