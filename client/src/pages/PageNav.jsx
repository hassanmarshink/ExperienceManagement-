import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../components/Logo";
import { useAuth } from "../contexts/AuthContext";
import User from "../components/User";
import React from "react";

function PageNav() {
  return (
    <div>
      <nav className={styles.nav}>
        <Logo />

        <ul>
          <li>
            <NavLink to="/create-survey">Create Survey</NavLink>
          </li>
          <li>
            <NavLink to="/send-survey">Send Survey</NavLink>
          </li>
          <li>
            <NavLink to="/display-survey-forms">Survey Forms</NavLink>
          </li>
          <li>
            <NavLink to="/analyze-survey">Analyze Survey</NavLink>
          </li>
        </ul>

        <div className={styles.userWrapper}>
          <User />
        </div>
      </nav>
    </div>
  );
}

export default PageNav;
