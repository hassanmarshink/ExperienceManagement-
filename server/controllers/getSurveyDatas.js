import SurveyData from "../models/surveyDataModel.js";

export const getSurveyDatas = async (req, res) => {
  try {
    console.log("inside get survey datas");

    const surveyId = req.query.formObjectId;
    console.log("data id==>", surveyId);

    const surveyData = await SurveyData.find({ FormId: surveyId });

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
