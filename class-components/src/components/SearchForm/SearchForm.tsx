import { type FormEvent, type ChangeEvent, useState, useEffect } from "react";
import styles from "./SearchForm.module.css";

type Props = {
  onSearchValueSubmit: (searchName: string) => void;
  searchValue: string;
};

const SearchForm = ({ onSearchValueSubmit, searchValue }: Props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem("lastSearch");

    if (valueFromLocalStorage) {
      setInputValue(valueFromLocalStorage);
    } else {
      setInputValue(searchValue);
    }
  }, []);

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
        type="search"
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
