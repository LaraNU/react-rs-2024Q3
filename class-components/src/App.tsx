import SearchPageCopy from "./components/Search/SearchPage";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.wrapper}>
      <SearchPageCopy />
      <footer className={styles.footer}></footer>
    </div>
  );
}

export default App;
