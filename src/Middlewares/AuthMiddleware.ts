import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserAttributes } from "../Models/User";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string) as UserAttributes;
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
}
