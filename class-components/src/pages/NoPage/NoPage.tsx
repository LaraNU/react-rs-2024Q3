import Link from "next/link";
import styles from "./NoPage.module.css";

const NoPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.noPageWrapper}>
        <span className={styles.noPageNumber}>404</span>
        <span className={styles.noPageText}>Page Not Found</span>
        <Link className={styles.noPageBtn} href="/">
          Go to Search Page
        </Link>
      </div>
    </div>
  );
};
export default NoPage;
