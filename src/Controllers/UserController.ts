import { Request, Response } from "express";
import { response200, response400, response500 } from "../Helpers/Response";
import { User } from "../Models/User";
import { validationResult } from "express-validator";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export async function updateUser(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0].msg;
      return response400(res, error);
    }

		const { name, email, username, password } = req.body;
		const user_id = req.app.get("user");
		const user = await User.findByPk(user_id) as any;

		const salt = genSaltSync(10);
		let hashedPassword = user.password;

		// check if email is different from the current email
		if (email != user.email) {
			const checkEmail = await User.findOne({ where: { email } });
			if (checkEmail) {
				return response400(res, "Email sudah terdaftar");
			}
		}

		// check if username is different from the current username
		if (username != user.username) {
			const checkUsername = await User.findOne({ where: { username } });
			if (checkUsername) {
				return response400(res, "Username sudah terdaftar");
			}
		}

		// check if password is different from the current password
		if (!compareSync(password, user.password)) {
			hashedPassword = hashSync(password, salt);
		}

		const data = {
			name: name || user.name,
			email: email || user.email,
			username: username || user.username,
			password: hashedPassword,
		};

		await user.update(data);

		return response200(res, "Akun anda berhasil di update", data);
  } catch (error: any) {
    console.error(error);
    return response500(res, "Internal server error");
  }
}
