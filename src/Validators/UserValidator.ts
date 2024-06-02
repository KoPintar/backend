import { body } from "express-validator";
import { User } from "../Models/User";
import { Op } from "sequelize";

export const UserValidator = [
  body("name").optional().notEmpty().withMessage("Name tidak boleh kosong"),
  body("email").optional().isEmail().withMessage("Format email invalid").custom(async (value, { req }) => {
    const user = await User.findOne({ where: { email: value, id: { [Op.ne]: req.user.id } } });
    if (user) {
      return Promise.reject("Email sudah terdaftar");
    }
  }),
  body("username").optional().notEmpty().withMessage("Username tidak boleh kosong").custom(async (value, { req }) => {
    const user = await User.findOne({ where: { username: value, id: { [Op.ne]: req.user.id } } });
    if (user) {
      return Promise.reject("Username sudah terdaftar");
    }
  }),
  body("password").optional().isLength({ min: 6 }).withMessage("Password minimal 8 karakter"),
  body("profileImg").optional().notEmpty().withMessage("Profile image tidak boleh kosong")
];
