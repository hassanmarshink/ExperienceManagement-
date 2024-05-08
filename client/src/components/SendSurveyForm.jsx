import React, { useState, useEffect } from "react";
import axios from "axios";
import DropDown from "./DropDown";
import styles from "./SendSurveyForm.module.css";
const apiUrl = import.meta.env.VITE_API_URL;

const SendSurveyForm = ({ surveyForms, error }) => {
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = async () => {
    try {
      var objData = {
        email: email,
        formId: selectedOption._id,
      };

      if (objData.email === "" || objData.formId === "") {
        alert("Email or Form Missing");
        return;
      }

      const response = await axios.post(`${apiUrl}/sendSurveyForm`, objData);

      alert(response.data.message);
      setEmail("");
      setSelectedOption(null);
    } catch (error) {
      alert("Error sending email:", error.response.data.message);
    }
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className={styles.container}>
        <h2>Survey Sender</h2>
        <h3>Enter Users Email</h3>
        <input
          type="email"
          placeholder="Enter recipient email"
          value={email}
          onChange={handleEmailChange}
        />

        <DropDown
          surveyForms={surveyForms}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setIsOptionSelected={setIsOptionSelected}
        />
        <button onClick={sendEmail}>Send Email</button>
      </div>
    </div>
  );
};

export default SendSurveyForm;
