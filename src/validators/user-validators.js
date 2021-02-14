import { check } from "express-validator";

const name = check("name", "Name is reqeuired.").not().isEmpty();
const username = check("username", "Username is reqeuired.").not().isEmpty();
const email = check("email", "Please provide a valid email address").isEmail();

const password = check(
  "password",
  "Password is reqeuired of minimum length of 6."
).isLength({
  min: 6,
});

export const RegisterValidations = [password, name, username, email];
export const AuthenticateValidations = [username, password];
