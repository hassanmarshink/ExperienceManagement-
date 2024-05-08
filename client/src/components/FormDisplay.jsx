import React, { useState, useEffect } from "react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import ThemeSwitcher from "./ThemeSwitcher"; // Your custom ThemeSwitcher component
import { ContrastLight } from "survey-core/themes/default-light";
import axios from "axios";
import { SurveyPDF } from "survey-pdf";
import styles from "./FormDisplay.module.css";
const websiteUrl = import.meta.env.VITE_WEBSITEURL;

const pdfDocOptions = {
  fontSize: 12,
};

async function saveSurveyResult(json) {
  try {
    alert("This is Dummy");
    // const jsonObject = JSON.parse(json);
    // console.log("json-saveSurvey==>", jsonObject);
    // alert(jsonObject);

    // const response = await axios.post(
    //   "http://localhost:3000/saveSurveyData",
    //   jsonObject
    // );
    // console.log("response==>", response.data);

    // if (response.status === 201) {
    //   alert(response.data.message);
    // } else {
    //   alert("Error in saving survey data!!!");
    // }
  } catch (error) {
    alert(error.message);
  }
}

function FormDisplay(selectedForm) {
  const [currentTheme, setCurrentTheme] = useState(ContrastLight);
  const surveysJson = selectedForm.selectedForm.surveyFData;

  const toggleTheme = (theme) => {
    setCurrentTheme(theme);
  };

  if (!surveysJson) {
    return <div>Loading survey...</div>;
  }

  const survey = new Model(surveysJson);

  const savePdf = function (surveyData) {
    const surveyPdf = new SurveyPDF(surveysJson, pdfDocOptions);
    surveyPdf.data = surveyData;
    surveyPdf.save();
  };

  survey.addNavigationItem({
    id: "pdf-export",
    title: "Save as PDF",
    action: () => savePdf(survey.data),
  });

  survey.onComplete.add((sender) => {
    const results = JSON.stringify(sender.data);

    saveSurveyResult(results);
  });

  survey.applyTheme(currentTheme);

  return (
    <div>
      <div className={styles.topRight}>
        <ThemeSwitcher
          currentTheme={currentTheme}
          onThemeChange={toggleTheme}
        />
      </div>
      <p className={styles.pTag}>
        Forms Api:
        <span>{`${websiteUrl}/take-survey?formObjectId=${selectedForm.selectedForm._id}`}</span>
      </p>

      <Survey model={survey} />
    </div>
  );
}

export default FormDisplay;
