import mongoose from "mongoose";

const surveyDataSchema = mongoose.Schema({}, { strict: false });

const SurveyData = mongoose.model("SurveyData", surveyDataSchema);

export default SurveyData;
