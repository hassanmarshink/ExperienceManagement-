import React, { useState, useEffect } from "react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import ThemeSwitcher from "./ThemeSwitcher";
import { ContrastLight } from "survey-core/themes/default-light";
import axios from "axios";
import styles from "./FormDisplayViaEmail.module.css";
const apiUrl = import.meta.env.VITE_API_URL;

function FormDisplayViaEmail() {
  const [currentTheme, setCurrentTheme] = useState(ContrastLight);
  const [surveyJson, setSurveyJson] = useState(null);
  const [surveyFormId, setSurveyFormId] = useState("");

  console.log("hello from form-email");

  const toggleTheme = (theme) => {
    setCurrentTheme(theme);
  };

  async function saveSurveyResult(json) {
    try {
      const jsonObject = JSON.parse(json);

      const oSurveyData = {
        SurveyData: jsonObject,
        FormId: surveyFormId,
      };

      const response = await axios.post(
        `${apiUrl}/saveSurveyData`,
        oSurveyData
      );

      if (response.status === 201) {
        alert(response.data.message);
      } else {
        alert("Error in saving survey data!!!");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  // Fetch survey data from backend (optional)
  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        // Retrieve the formObjectId from query params
        const searchParams = new URLSearchParams(window.location.search);
        const formObjectId = searchParams.get("formObjectId");
        setSurveyFormId(formObjectId);
        // Fetch survey data from backend along with the formObjectId
        const responseData = await axios.get(
          `${apiUrl}/getSurveyForm?formObjectId=${formObjectId}`
        );

        if (responseData.error) {
          alert("Error fetching survey data:", responseData.error);
          return;
        }

        setSurveyJson(responseData.data.data.surveyFData);
      } catch (error) {
        alert("Error fetching survey data:", error);
      }
    };

    fetchSurveyData();
  }, []);

  if (!surveyJson) {
    return <div>Loading survey...</div>;
  }

  const survey = new Model(surveyJson);

  survey.onComplete.add((sender) => {
    const results = JSON.stringify(sender.data);

    saveSurveyResult(results);
  });

  survey.applyTheme(currentTheme);

  return (
    <div className={styles.container}>
      <div className={styles.toggleBtn}>
        <ThemeSwitcher
          currentTheme={currentTheme}
          onThemeChange={toggleTheme}
        />
      </div>
      <Survey model={survey} />
    </div>
  );
}

export default FormDisplayViaEmail;
