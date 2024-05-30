import { body } from "express-validator";
import { User } from "../Models/User";

export const RegisterValidator = [
  body("name").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("name").isLength({ min: 3 }).withMessage("Nama minimal 3 karakter"),

  body("email").notEmpty().withMessage("Email tidak boleh kosong"),
  body("email").isEmail().withMessage("Email tidak valid"),
  body("email").custom(async (value) => {
    const user = await User.findOne({ where: { email: value } });
    if (user) {
      return Promise.reject("Email sudah terdaftar");
    }
  }),

  body("username").notEmpty().withMessage("Username tidak boleh kosong"),
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username minimal 3 karakter"),
  body("username").custom(async (value) => {
    const user = await User.findOne({ where: { username: value } });
    if (user) {
      return Promise.reject("Username sudah terdaftar");
    }
  }),

  body("password").notEmpty().withMessage("Password tidak boleh kosong"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
];