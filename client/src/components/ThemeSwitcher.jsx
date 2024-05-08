import React from "react";
import { ContrastLight } from "survey-core/themes/default-light";
import { BorderlessDark } from "survey-core/themes/borderless-dark";
import styles from "./ThemeSwitcher.module.css";

const theme1 = ContrastLight;
const theme2 = BorderlessDark;
const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  const toggleTheme = () => {
    onThemeChange(currentTheme === theme1 ? theme2 : theme1);
  };

  return (
    <div className={styles.themeSwitcher}>
      <button className={styles.buttonStyle} onClick={toggleTheme}>
        {currentTheme === theme1 ? (
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="2em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            ></path>
          </svg>
        ) : (
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="2em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            ></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
