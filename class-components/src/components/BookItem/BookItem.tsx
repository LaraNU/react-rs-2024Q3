// import React from "react";
import styles from "./BookItem.module.css";

type BookProps = {
  post: {
    title: string;
    author_name: Array<string>;
  };
  src: string;
  key: string;
};

const BookItem = ({ ...props }: BookProps) => {
  return (
    <div key={props.key} className={styles.post}>
      <div className={styles.imgContainer}>
        <img {...props} className={styles.img}></img>
      </div>
      <div className={styles.title}>{props.post.title}</div>
      <div className={styles.authorName}>{props.post.author_name}</div>
    </div>
  );
};

export default BookItem;
