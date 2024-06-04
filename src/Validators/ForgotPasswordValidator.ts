import { body } from "express-validator";

export const ForgotPasswordValidator = [
  body("email").notEmpty().withMessage("Email tidak boleh kosong"),
];
