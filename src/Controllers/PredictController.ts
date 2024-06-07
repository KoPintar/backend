import { Request, Response } from "express";
import * as tf from "@tensorflow/tfjs-node";
import {
  response200,
  response201,
  response500,
  response404,
  response413,
} from "../Helpers/Response";

export async function roasting(req: Request, res: Response) {
  try {
		const model = req.app.get("model.profileRoasting");
    const image = req.file as Express.Multer.File;

    const tensor = tf.node
      .decodeJpeg(image.buffer)
      .resizeNearestNeighbor([224, 224])
      .div(tf.scalar(255.0))
      .expandDims();

    const prediction = model.predict(tensor) as tf.Tensor;
    const score = prediction.arraySync() as number[][];
    const confidenceScore = Math.max(...score[0]);

    const classResult = score[0].indexOf(confidenceScore);

    const classes = ["Dark", "Green", "Light", "Medium"];
    const result = classes[classResult];

		return response200(res, "Data berhasil didapatkan", {
      result,
      classResult,
      confidenceScore,
    });
  } catch (error: any) {
    console.log(error);
    return response500(res, "Internal Server Error");
  }
}

export async function daun(req: Request, res: Response) {
  try {
    const model = req.app.get("model.daun");
    const image = req.file as Express.Multer.File;

    const tensor = tf.node
      .decodeJpeg(image.buffer)
      .resizeNearestNeighbor([256, 256])
      .div(tf.scalar(255.0))
      .expandDims();

    const prediction = model.predict(tensor) as tf.Tensor;
    const score = prediction.arraySync() as number[][];
    const confidenceScore = Math.max(...score[0]);

    const classResult = score[0].indexOf(confidenceScore);

    const classes = [
      "Lumut",
      "Miner",
      "Sehat",
      "Penggerek",
      "Penggerek Lumut",
      "Penggerek Phoma",
      "Phoma",
      "Phoma Lumut",
      "Rust",
    ];
    const result = classes[classResult];
    const suggestion = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ];

    return response200(res, "Data berhasil didapatkan", {
      result,
      classResult,
      confidenceScore,
      suggestion: suggestion,
    });
  } catch (error: any) {
    console.log(error);
    return response500(res, "Internal Server Error");
  }
}

export async function biji(req: Request, res: Response) {
  try {
    const model = req.app.get("model.biji");
    const image = req.file as Express.Multer.File;

    const tensor = tf.node
      .decodeJpeg(image.buffer)
      .resizeNearestNeighbor([120, 120])
      .div(tf.scalar(255.0))
      .expandDims();

    const prediction = model.predict(tensor) as tf.Tensor;
    const score = prediction.arraySync() as number[][];
    const confidenceScore = Math.max(...score[0]);

    const classes = ["Berry Borer", "Damaged", "Healthy"];
    const classResult = score[0].indexOf(confidenceScore);
    const result = classes[classResult];
    const suggestion = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ];

    return response200(res, "Data berhasil didapatkan", {
      result,
      classResult,
      confidenceScore,
      suggestion: suggestion,
    });
  } catch (error: any) {
    console.log(error);
    return response500(res, "Internal Server Error");
  }
}