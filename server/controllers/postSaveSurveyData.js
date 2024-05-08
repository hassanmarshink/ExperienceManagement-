import SurveyData from "../models/surveyDataModel.js";

// Controller logic for handling survey data routes
// Example: saving survey data
export const saveSurveyData = async (req, res) => {
  try {
    const Data = req.body;
    console.log("surveyData==", Data);

    const newSurveyData = new SurveyData(Data);
    //Save the new survey data
    const savedSurveyData = await newSurveyData.save();
    //Return the ObjectId of the newly saved document

    res.status(201).json({
      message: "Survey data saved successfully",
      id: savedSurveyData._id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving survey data." });
  }
};
