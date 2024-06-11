import { Request, Response } from "express";
import {
  response201,
  response500,
} from "../Helpers/Response";
import { Suggestion } from "../Models/Suggestion";

export async function addSuggestion(req: Request, res: Response) {
  try {
    const suggestion = await Suggestion.create(req.body);
    return response201(res, "Data berhasil ditambahkan", suggestion);
  } catch (error: any) {
    console.log(error);
    return response500(res, "Internal server error");
  }
}
