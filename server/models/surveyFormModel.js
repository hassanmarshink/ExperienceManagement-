import mongoose from "mongoose";

const surveyFormSchema = mongoose.Schema({}, { strict: false });

const SurveyForm = mongoose.model("SurveyForm", surveyFormSchema);

export default SurveyForm;
