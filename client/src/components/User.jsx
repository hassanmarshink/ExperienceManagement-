import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function User() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowClose = (event) => {
      // Trigger logout when the window is being closed
      logout();
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, [logout]);

  function handleClick() {
    logout();
    navigate("/");
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button className={styles.btn} onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}

export default User;
