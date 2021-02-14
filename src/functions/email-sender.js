import sgMail from "@sendgrid/mail";
import { SENDGRID_API_KEY, HOST_EMAIL } from "../constants";

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (email, subject, text, html) => {
  try {
    const msg = {
      to: email, // Change to your recipient
      from: HOST_EMAIL, // Change to your verified sender
      subject,
      text,
      html,
    };

    await sgMail.send(msg);
    console.log("MAIL_SENT");
  } catch (error) {
    console.log("ERROR_MAILING", error.message);
  } finally {
    return;
  }
};

export default sendMail;
