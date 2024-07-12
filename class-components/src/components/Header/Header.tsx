import SearchForm from "../SearchForm/SearchForm";
import styles from "./Header.module.css";

type HeaderProps = {
  onSearchValueSubmit: (value: string) => void;
};

const Header = ({ onSearchValueSubmit }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.searchField}>
        <SearchForm onSearchValueSubmit={onSearchValueSubmit} />
      </div>
    </header>
  );
};

export default Header;
