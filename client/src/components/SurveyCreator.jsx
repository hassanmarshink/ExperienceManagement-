import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import Button from "./Button";
import styles from "./SurveyCreator.module.css";

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};

const defaultJson = {
  pages: [
    {
      name: "Name",
      elements: [
        {
          name: "FirstName",
          title: "Enter your first name:",
          type: "text",
        },
        {
          name: "LastName",
          title: "Enter your last name:",
          type: "text",
        },
      ],
    },
  ],
};

const SurveyCreatorWrapper = React.memo(({ creator }) => {
  return <SurveyCreatorComponent creator={creator} />;
});

export function SurveyCreatorWidget({ setIsSurveyCreator }) {
  const [surveyName, setSurveyName] = useState("");
  const [surveyForms, setSurveyForms] = useState([]);

  const handleSurveyNameChange = useCallback((event) => {
    setSurveyName(event.target.value);
  }, []);

  const handleSurveyCreationComplete = () => {
    setIsSurveyCreator(false);
  };

  async function saveSurveyResult(NewSurveyName) {
    try {
      console.log("survey name==>", NewSurveyName);
      const surveyData = window.localStorage.getItem("survey-json");
      console.log("inside save func==>", surveyData);

      if (NewSurveyName === "") {
        alert("Please Enter A Unique Survey Name");
        return;
      }

      // Check if the survey name already exists
      if (surveyForms.some((form) => form.surveyName === NewSurveyName)) {
        alert("Survey Name already exists! Please enter a new Survey Name");
        return;
      }

      const oSurveyFormData = {
        surveyName: surveyName,
        surveyFData: surveyData,
      };
      const response = await axios.post(
        "http://localhost:3000/saveSurveyForm",
        oSurveyFormData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert(response.data.message);
      setSurveyName("");
    } catch (error) {
      alert(error.message);
    }
  }

  // Fetch survey forms from the server when the component mounts
  useEffect(() => {
    async function fetchSurveyForms() {
      try {
        const response = await axios.get(
          "http://localhost:3000/getAllSurveyForms"
        );

        setSurveyForms(response.data);
      } catch (error) {
        alert("Error fetching survey forms:", error);
      }
    }
    fetchSurveyForms();

    // Cleanup function to reset state when component unmounts
    return () => {
      setSurveyName("");
      setSurveyForms([]);
    };
  }, []);

  const creator = new SurveyCreator(creatorOptions);
  creator.text =
    window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
  creator.saveSurveyFunc = (saveNo, callback) => {
    window.localStorage.setItem("survey-json", creator.text);

    callback(saveNo, true);
  };

  return (
    <div className={styles.container}>
      <section>
        <input
          type="text"
          value={surveyName}
          onChange={handleSurveyNameChange}
          placeholder="Enter a unique survey name"
        />
        <Button onClick={() => saveSurveyResult(surveyName)} />
        <SurveyCreatorWrapper creator={creator} />
      </section>
    </div>
  );
}
