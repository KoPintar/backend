import { Request, Response } from "express";
import {
  response200,
  response201,
  response500,
  response400,
} from "../Helpers/Response";
import { User } from "../Models/User";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Helpers/SendEmail";
import { v4 as uuid } from 'uuid';

export async function register(req: Request, res: Response) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error = errors.array()[0].msg;
			return response400(res, error);
		}

		const salt = genSaltSync(10);
    const hashedPassword = hashSync(req.body.password, salt);

		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			username: req.body.username,
			password: hashedPassword,
			profileImg: "image.png"
		});

		return response201(res, "Akun anda berhasil dibuat", user);
	} catch (error: any) {
		console.error(error);
		return response500(res, "Internal server error");
	}
}

export async function login(req: Request, res: Response) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error = errors.array()[0].msg;
			return response400(res, error);
		}

		// exclude password from user data
		const user = await User.findOne({ where: { username: req.body.username }}) as any;
		const checkPassword = compareSync(req.body.password, user.password);
		if (!checkPassword) {
      return response400(res, "Password anda salah");
    }

		// create payload for jwt
		const payload = {
			iss: "KoPintar",
			sub: user.id,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 14),
		};
		
		// create jwt token
		const token = jwt.sign(payload, process.env.JWT_KEY as string);
		const data = {
			id: user.id,
			name: user.name,
			email: user.email,
			username: user.username,
			profileImg: user.profileImg,
			token: token,
		};

		return response200(res, "Login berhasil", data);
	} catch (error: any) {
		console.error(error);
		return response500(res, "Internal server error");
	}
}

export async function forgotPassword(req: Request, res: Response) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error = errors.array()[0].msg;
			return response400(res, error);
		}

		const { email } = req.body;
		const user = await User.findOne({ where: { email: email }}) as any;

		if (!user) {
			return response400(res, "Email tidak terdaftar");
		}

		const token = uuid();
		await user.update({ resetPasswordToken: token });

		await sendEmail({
			name: user.name,
			email: user.email,
			token: token,
		});

		return response200(res, "Email pemulihan berhasil dikirim", {email: user.email});
	} catch(error) {
		console.error(error);
		return response500(res, "Internal server error");
	}
}

export async function resetPassword(req: Request, res: Response) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error = errors.array()[0].msg;
			return response400(res, error);
		}

		const { token, password } = req.body;
		const user = await User.findOne({ where: { resetPasswordToken: token }}) as any;
		if (!user) {
			return response400(res, "Token tidak valid");
		}

		const salt = genSaltSync(10);
		const hashedPassword = hashSync(password, salt);
		await user.update({ password: hashedPassword, resetPasswordToken: null });

		return response200(res, "Password berhasil diperbarui", {email: user.email});
	} catch(error) {
		console.error(error);
		return response500(res, "Internal server error");
	}
}
