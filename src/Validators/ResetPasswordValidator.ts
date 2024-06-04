import { body } from "express-validator";

export const ResetPasswordValidator = [
  body("token").notEmpty().withMessage("Token tidak boleh kosong"),
  body("password").notEmpty().withMessage("Password tidak boleh kosong"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Konfirmasi password tidak boleh kosong"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Konfirmasi password tidak sama");
    }
    return true;
  }),
];
