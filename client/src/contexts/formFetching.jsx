import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const useSurveyForms = () => {
  const [surveyForms, setSurveyForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSurveyForms() {
      try {
        const response = await axios.get(`${apiUrl}/getAllSurveyForms`);
        let originalArray = response.data;
        let dummyObject = { _id: 0, surveyName: "Select A Form" };
        originalArray.splice(0, 0, dummyObject);
        setSurveyForms(originalArray);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchSurveyForms();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return { surveyForms, loading, error };
};

export default useSurveyForms;
