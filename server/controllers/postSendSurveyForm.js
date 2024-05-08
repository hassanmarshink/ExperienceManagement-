import Sib from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();
const websiteUrl = process.env.WEBSITEURL;

export const sendSurveyForm = async (req, res) => {
  try {
    const receiverEmail = req.body.email;
    const formObjectId = req.body.formId;

    // setting up sendinblue
    // Initialize the default client
    const defaultClient = await Sib.ApiClient.instance;
    var apiKey = await defaultClient.authentications["api-key"];

    // Create a new instance of the TransactionalEmailsApi
    const transEmailApi = await new Sib.TransactionalEmailsApi();

    apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

    const path = `${websiteUrl}/take-survey?formObjectId=${formObjectId}`;

    const sender = {
      email: "alidj007@gmail.com",
      name: "Ali",
    };

    // const receivers = receiverEmail.map((email) => ({
    //   email: email,
    // }));
    const receivers = [
      {
        email: receiverEmail,
      },
    ];

    const sendEmailsPromises = await transEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Take this survey",
      htmlContent: `<a href="${path}">Click Here</a> to take this survey!`,
    });

    // Wait for all emails to be sent
    // await Promise.all(sendEmailsPromises);

    return res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email" });
  }
};
