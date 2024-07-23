import SearchForm from "../SearchForm/SearchForm";
import styles from "./Header.module.css";

type HeaderProps = {
  onSubmit: (value: string) => void;
};

const Header = ({ onSubmit }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.searchField}>
        <SearchForm onSearchValueSubmit={onSubmit} />
      </div>
    </header>
  );
};

export default Header;
