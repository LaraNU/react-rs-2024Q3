import SearchForm from "../SearchForm/SearchForm";
import styles from "./Header.module.css";

type HeaderProps = {
  onSubmit: (value: string) => void;
  searchVal: string;
};

const Header = ({ onSubmit, searchVal }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.searchField}>
        <SearchForm onSearchValueSubmit={onSubmit} searchValue={searchVal} />
      </div>
    </header>
  );
};

export default Header;
