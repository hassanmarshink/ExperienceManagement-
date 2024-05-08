import React, { useState, useEffect } from "react";
import axios from "axios";
import "survey-analytics/survey.analytics.min.css";
import { Model } from "survey-core";
import { VisualizationPanel } from "survey-analytics";
const apiUrl = import.meta.env.VITE_API_URL;

const vizPanelOptions = {
  allowHideQuestions: false,
};

export default function AnalyzeSurvey(selectedForm) {
  const [survey, setSurvey] = useState(null);
  const [vizPanel, setVizPanel] = useState(null);
  const formObjectId = selectedForm.selectedForm._id;

  //Fetching Survey Form and Survey Data from backend
  useEffect(() => {
    // Defining a function to fetch survey data from the backend
    const fetchSurveyData = async () => {
      try {
        //Make an Axios GET request to fetch survey data from the backend
        const formResponse = await axios.get(
          `${apiUrl}/getSurveyForm?formObjectId=${formObjectId}`
        );
        const formData = formResponse.data.data.surveyFData;

        const surveyResponse = await axios.get(
          `${apiUrl}/getSurveyDatas?formObjectId=${formObjectId}`
        );
        const surveyData = surveyResponse.data.data;

        // Extract survey values into a separate array
        const surveyDataArray = surveyData.map((item) => item.SurveyData);

        //Create a new survey model:
        const survey = new Model(formData);
        setSurvey(survey);

        // Create a new visualization panel
        const vizPanel = new VisualizationPanel(
          survey.getAllQuestions(), //This method retrieves all the questions present in the survey model.
          surveyDataArray, //This array contains the survey data fetched from the backend.
          vizPanelOptions //This variable contains options for configuring the visualization panel, such as whether to allow hiding questions.
        );
        vizPanel.showHeader = false; //It hides the header of the visualization panel, which typically contains information about the survey.
        setVizPanel(vizPanel);
      } catch (error) {
        alert("Error fetching survey data:", error);
      }
    };

    // Call the fetchSurveyData function when the component mounts
    fetchSurveyData();

    // Clean up function
    return () => {
      // Perform any necessary cleanup
    };
  }, []);

  useEffect(() => {
    if (vizPanel) {
      // Render visualization panel when vizPanel is available
      const surveyVizPanel = document.getElementById("surveyVizPanel");
      if (surveyVizPanel) {
        vizPanel.render(surveyVizPanel);
      }
    }

    // Clean up function
    return () => {
      // Clear visualization panel when component unmounts
      const surveyVizPanel = document.getElementById("surveyVizPanel");
      if (surveyVizPanel) {
        surveyVizPanel.innerHTML = "";
      }
    };
  }, [vizPanel]);

  return <div id="surveyVizPanel" />;
}
