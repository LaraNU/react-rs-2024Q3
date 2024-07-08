import { Component, ReactNode } from "react";
import styles from "./Error.module.css";

export default class Error extends Component {
  state = {
    hasError: false,
  };

  throwError = () => {
    this.setState({
      hasError: true,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error("Sorry.. there was an error");
    }
    return (
      <button className={styles.errorBtn} onClick={this.throwError}>
        Error
      </button>
    );
  }
}
