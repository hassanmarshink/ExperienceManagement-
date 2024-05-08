import React from "react";

const DropDown = ({
  surveyForms,
  selectedOption,
  setSelectedOption,
  setIsOptionSelected,
}) => {
  // Function to handle option selection
  const handleOptionSelect = (event) => {
    const selectedValue = event.target.value;
    const selectedForm = JSON.parse(selectedValue);
    setSelectedOption(() => selectedForm);
    setIsOptionSelected(true);
  };

  return (
    <div>
      <h2>Select A Form</h2>
      <select
        value={selectedOption ? JSON.stringify(selectedOption) : ""}
        onChange={handleOptionSelect}
      >
        {surveyForms.map((form) => (
          <option key={form.id} value={JSON.stringify(form)}>
            {form.surveyName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
