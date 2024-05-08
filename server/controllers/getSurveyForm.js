import SurveyForm from "../models/surveyFormModel.js";

export const getSurveyForm = async (req, res) => {
  try {
    console.log("inside get single survey backend");

    const surveyId = req.query.formObjectId;
    // Fetch survey data by ObjectId
    const surveyData = await SurveyForm.findById(surveyId);
    // console.log("data from database==>", surveyData);

    // Return the survey data
    res.status(200).json({ data: surveyData });

    // res.status(201).json({ message: "Survey Data Recived!", data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving survey data." });
  }
};
