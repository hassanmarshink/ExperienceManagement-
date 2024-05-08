import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import React from "react";

function Logo() {
  return (
    <Link to="/">
      <img
        src="../../public/images/ink-logo-dark.jpeg"
        alt="Ink It logo"
        className={styles.logo}
      />
    </Link>
  );
}

export default Logo;
