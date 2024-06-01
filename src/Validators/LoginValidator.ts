import { body } from "express-validator";
import { User } from "../Models/User";

export const LoginValidator = [
  body("username").notEmpty().withMessage("Username tidak boleh kosong"),
  body("username").custom(async (value) => {
		const user = await User.findOne({ where: { username: value } });
		if (!user) {
			return Promise.reject("Akun anda tidak terdaftar");
		}
	}),

  body("password").notEmpty().withMessage("Password tidak boleh kosong"),
];