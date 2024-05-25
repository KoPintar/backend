import { Response } from "express";

export async function response200(res: Response, msg: string, data: any) {
  return res.status(200).json({
    success: true,
    message: msg,
    data: data,
  });
}

export async function response201(res: Response, msg: string, data: any) {
  return res.status(201).json({
    success: true,
    message: msg,
    data: data,
  });
}

export async function response400(res: Response, msg: string) {
  return res.status(400).json({
    success: false,
    message: msg,
  });
}

export async function response404(res: Response, msg: string) {
	return res.status(404).json({
    success: false,
    message: msg,
  });
}

export async function response413(res: Response, msg: string) {
	return res.status(413).json({
    success: false,
    message: msg,
  });
}

export async function response500(res: Response, msg: string) {
  return res.status(500).json({
    success: false,
    message: msg,
  });
}
