import React from "react";
import ".././App.css";
import styles from "./Button.module.css";

const Button = ({ onClick }) => {
  return (
    <button className={styles.buttonStyle} onClick={onClick}>
      Submit
    </button>
  );
};

export default Button;
