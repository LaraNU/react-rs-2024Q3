import { type FormEvent, useState, ChangeEvent } from "react";
import styles from "./SearchForm.module.css";

type Props = {
  onSearchValueSubmit: (searchName: string) => void;
};

const SearchForm = ({ onSearchValueSubmit }: Props) => {
  const valueFromLocalStorage = localStorage.getItem("lastSearch");
  const [inputValue, setInputValue] = useState(valueFromLocalStorage || "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchValueSubmit(inputValue.trim());
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form className={styles.searchField} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchFieldInput}
        onChange={handleSearchChange}
        value={inputValue}
      />
      <button type="submit" className="searchFieldBtn" value="search">
        search
      </button>
    </form>
  );
};

export default SearchForm;
