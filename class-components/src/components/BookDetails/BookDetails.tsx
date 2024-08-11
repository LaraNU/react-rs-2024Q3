import { useState } from "react";
import styles from "./BookDetails.module.css";

import { useDispatch } from "react-redux";
import { closeCard } from "@/store/cardStatusSlice";

type BookProps = {
  post: {
    title: string;
    author_name: Array<string>;
  };
  src: string;
  alt: string;
  firstSentence: Array<string>;
  firstPublishYear: number;
};

const BookDetails = (props: BookProps) => {
  const dispatch = useDispatch();

  const [detailsCard, setDetailsCard] = useState(true);

  const handleClick = () => {
    setDetailsCard(false);
    dispatch(closeCard(detailsCard));
  };

  return (
    detailsCard && (
      <div className={styles.detailsPost}>
        <button onClick={handleClick} className={styles.closeBtn}>
          X
        </button>
        <div className={styles.imgContainer}>
          <img src={props.src} alt={props.alt} className={styles.img} />
        </div>
        <div className={styles.text}>{props.post.title}</div>
        <div className={styles.authorName}>{props.post.author_name}</div>
        <p className={styles.text}>
          First publish year: {props.firstPublishYear}
        </p>
        <p className={styles.text}>First sentence in book:</p>
        <ul className={styles.firstSentenceList}>
          {props.firstSentence &&
            props.firstSentence.map((sentence, idx) => (
              <li key={idx}>{sentence}</li>
            ))}
        </ul>
      </div>
    )
  );
};

export default BookDetails;
