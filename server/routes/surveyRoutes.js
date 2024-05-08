import express from "express";
import { saveSurveyForm } from "../controllers/postSaveSurveyForm.js";
import { saveSurveyData } from "../controllers/postSaveSurveyData.js";
import { getAllSurveyForms } from "../controllers/getAllSurveyForm.js";
import { getSurveyForm } from "../controllers/getSurveyForm.js";
import { getSurveyDatas } from "../controllers/getSurveyDatas.js";
import { sendSurveyForm } from "../controllers/postSendSurveyForm.js";
import { setAdminPassword } from "../controllers/setAdminPassword.js";

const router = express.Router();

router.post("/saveSurveyForm", saveSurveyForm);
router.post("/saveSurveyData", saveSurveyData);
router.get("/getAllSurveyForms", getAllSurveyForms);
router.get("/getSurveyForm", getSurveyForm);
router.get("/getSurveyDatas", getSurveyDatas);
router.post("/sendSurveyForm", sendSurveyForm);
router.post("/updateAdminPassword", setAdminPassword);

export default router;
