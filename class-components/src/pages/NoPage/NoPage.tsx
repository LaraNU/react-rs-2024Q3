import { Link } from "react-router-dom";
import styles from "./NoPage.module.css";

const NoPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.noPageWrapper}>
        <span className={styles.noPageNumber}>404</span>
        <span className={styles.noPageText}>Page Not Found</span>
        <Link className={styles.noPageBtn} to="/">
          Go to Search Page
        </Link>
      </div>
    </div>
  );
};
export default NoPage;
