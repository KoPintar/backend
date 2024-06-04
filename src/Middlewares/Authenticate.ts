import { Request, Response, NextFunction } from "express";
import { response401 } from "../Helpers/Response";
import jwt from "jsonwebtoken";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return response401(res, "Token tidak ditemukan");
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    if (!decoded) {
			return response401(res, "Token tidak valid");
		}

		req.app.set("user", decoded.sub);
    next();
  } catch (error: any) {
    console.error(error);
    return response401(res, "Token tidak valid");
  }
}
