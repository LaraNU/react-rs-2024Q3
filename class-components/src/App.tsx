import SearchPage from "./components/SearchPage/SearchPage";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.wrapper}>
      <SearchPage />
      <footer className={styles.footer}></footer>
    </div>
  );
}

export default App;
