import AdminModel from "../models/adminModel.js";

// Controller logic for handling survey data routes
// Example: saving survey data
export const setAdminPassword = async (req, res) => {
  try {
    const Data = req.body;
    console.log("surveyData==", Data);

    const newAdminData = new AdminModel(Data);
    //Save the new survey data
    const savedAdminData = await newAdminData.save();
    //Return the ObjectId of the newly saved document

    res.status(201).json({
      message: "Password Updated successfully",
      id: savedAdminData._id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving survey data." });
  }
};
