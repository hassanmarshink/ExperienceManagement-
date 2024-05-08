import SurveyForm from "../models/surveyFormModel.js";

export const getAllSurveyForms = async (req, res) => {
  try {
    console.log("inside get all survey backend");
    //Fetch all survey forms from the database
    const allSurveyForms = await SurveyForm.find();

    res.status(200).json(allSurveyForms);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching survey forms." });
  }
};
