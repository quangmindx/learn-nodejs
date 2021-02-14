import { User } from "../models";
import Validator from "../middlewares/validator-middleware";
import { RegisterValidations } from "../validators";
import { Router } from "express";
import { randomBytes } from "crypto";
import sendMail from "../functions/email-sender";

const router = Router();

/**
 * @description To create a new User Account
 * @api /users/api/register
 * @access Public
 * @type POST
 */

router.post(
  "/api/register",
  RegisterValidations,
  Validator,
  async (req, res) => {
    try {
      const { username, email } = req.body;
      // Check if the username is taken or not
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken.",
        });
      }

      // Check if the user exists with that email
      user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          message:
            "Email is already registered. Did you forget password. Try resetting it.",
        });
      }

      user = new User({
        ...req.body,
        verificationCode: randomBytes(20).toString("hex"),
      });
      await user.save();

      // send the email to the user with a verification link
      let htmlMail = `
            <div>
                <h1>Hello ${user.username}</h1>
                <p>Please click the following link to verify Your Account</p>
                <a href="/users/verify-now/${user.verificationCode}">Verify Now</a>
            </div>
          `;
      await sendMail(
        user.email,
        "Verify Account",
        "Please verify your account.",
        htmlMail
      );
      return res.status(201).json({
        success: true,
        message:
          "Happy! Your account is created please verify your email address.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred.",
      });
    }
  }
);

export default router;
