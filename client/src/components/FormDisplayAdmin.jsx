import React, { useState, useEffect } from "react";
import axios from "axios";
// import FormCreator from "./FormCreator";
import FormDisplay from "./FormDisplay";
import styles from "./FormDisplayAdmin.module.css";
import PageNav from "../pages/PageNav";
import Spinner from "./Spinner";
import useSurveyForms from "../contexts/formFetching";
import DropDown from "./DropDown";

function FormDisplayAdmin({ surveyForms, error }) {
  // Define state to hold the selected option
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  // if (!ready) <Spinner />;

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      {isOptionSelected ? (
        <FormDisplay selectedForm={selectedOption} />
      ) : (
        <DropDown
          surveyForms={surveyForms}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setIsOptionSelected={setIsOptionSelected}
        />
      )}
    </div>
  );
}

export default FormDisplayAdmin;
