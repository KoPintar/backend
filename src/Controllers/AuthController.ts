import { Request, Response } from "express";
import { response200, response201, response500, response404, response413 } from "../Helpers/Response";
import { User } from "../Models/User";


export async function register(req: Request, res: Response) {
	try {
		const user = await User.create(req.body);
		return response201(res, "Data berhasil ditambahkan", user);
	} catch (error: any) {
		console.log(error);
		return response500(res, "Internal server error");
	}
}

//function login
