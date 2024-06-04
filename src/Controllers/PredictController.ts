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
      .expandDims(0)
      .toFloat();

    const prediction = model.predict(tensor) as tf.Tensor;
    const score = prediction.arraySync() as number[][];
    const confidenceScore = Math.max(...score[0]);

    const classResult = score[0].indexOf(confidenceScore);
    const classes = [
      "Miner",
      "Nodisease",
      "Phoma",
      "Rust",
      "Penggerek",
      "Lumut",
      "Penggerek Phoma",
      "Penggerek Lumut",
      "Phoma Lumut",
    ];

    // lumut, penggerek, penggerek_lumut, penggerek_phoma: 3
    // miner, phoma_lumut, rust: 8
    // sehat: 2
    // phoma: 6

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