import styles from "./BookItem.module.css";

type BookProps = {
  post: {
    title: string;
    author_name: Array<string>;
  };
  src: string;
  alt: string;
};

const BookItem = (props: BookProps) => {
  return (
    <div className={styles.post}>
      <div className={styles.imgContainer}>
        <img src={props.src} alt={props.alt} className={styles.img}></img>
      </div>
      <div className={styles.title}>{props.post.title}</div>
      <div className={styles.authorName}>{props.post.author_name}</div>
    </div>
  );
};

export default BookItem;
