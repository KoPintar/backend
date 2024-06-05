import { body } from "express-validator";

export const UserValidator = [
  body("name").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("name").isLength({ min: 3 }).withMessage("Nama minimal 3 karakter"),

  body("email").notEmpty().withMessage("Email tidak boleh kosong"),
  body("email").isEmail().withMessage("Email tidak valid"),

  body("username").notEmpty().withMessage("Username tidak boleh kosong"),
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username minimal 3 karakter"),

  body("password").notEmpty().withMessage("Password tidak boleh kosong"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
];
