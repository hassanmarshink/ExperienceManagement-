import React, { useState, useEffect } from "react";
import AnalyzeSurvey from "./AnalyzeSurvey";
import styles from "./AnalyzeDisplayAdmin.module.css";

import DropDown from "./DropDown";

function AnalyzeDisplayAdmin({ surveyForms, error }) {
  // Define state to hold the selected option
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  // Function to handle option selection
  const handleOptionSelect = (event) => {
    const selectedValue = event.target.value;
    console.log("selectedValue:", selectedValue); // Debugging statement
    const selectedForm = JSON.parse(selectedValue);
    console.log("selectedForm:", selectedForm._id); // Debugging statement
    setSelectedOption(() => selectedForm._id); // Use functional update
    console.log("selectedFormOption:", selectedOption);

    setIsOptionSelected(true);
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className={styles.container}>
        {isOptionSelected ? (
          <AnalyzeSurvey selectedForm={selectedOption} />
        ) : (
          <DropDown
            surveyForms={surveyForms}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setIsOptionSelected={setIsOptionSelected}
          />
        )}
      </div>
    </div>
  );
}

export default AnalyzeDisplayAdmin;
