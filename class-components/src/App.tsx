import Search from "./components/Search/Search";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.wrapper}>
      <Search />
      <footer className={styles.footer}></footer>
    </div>
  );
}

export default App;
