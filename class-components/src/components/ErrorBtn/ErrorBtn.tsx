import { useState } from "react";
import styles from "./ErrorBtn.module.css";

const ErrorBtn = () => {
  const [hasError, setError] = useState(false);

  const throwError = () => {
    setError(true);
  };

  if (hasError) {
    throw new Error("Sorry.. there was an error");
  }
  return (
    <button className={styles.errorBtn} onClick={throwError}>
      Error
    </button>
  );
};

export default ErrorBtn;
