import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import { useAuth } from "../contexts/AuthContext";
import React from "react";

export default function Homepage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className={styles.homepage}>
      <section>
        <h1>
          <br />
          "Empower insights, shape decisions: Survey your world, illuminate
          perspectives."
        </h1>
        <h2>
          "Empowering users to create, distribute, and analyze surveys
          effortlessly. Seamlessly capture insights, generate reports, and
          export data to PDF, providing comprehensive analytics for informed
          decision-making."
        </h2>
        {isAuthenticated ? null : (
          <Link to="/login" className="cta">
            Login
          </Link>
        )}
      </section>
    </main>
  );
}
