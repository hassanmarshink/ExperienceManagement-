import SurveyForm from "../models/surveyFormModel.js";

// Controller logic for handling survey form routes
// Example: saving survey form data
export const saveSurveyForm = async (req, res) => {
  try {
    const surveyFormData = req.body;
    const newSurvey = new SurveyForm(surveyFormData);
    // Save the new survey data
    const savedSurveyForm = await newSurvey.save();
    // Return the ObjectId of the newly saved document
    console.log("data id==>", savedSurveyForm._id);
    res.status(201).json({
      message: "Survey data saved successfully",
      id: savedSurveyForm._id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving survey data." });
  }
};
