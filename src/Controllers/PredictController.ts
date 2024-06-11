import { Request, Response } from "express";
import * as tf from "@tensorflow/tfjs-node";
import {
  response200,
  response400,
  response500,
} from "../Helpers/Response";
import { saveHistory } from "../Helpers/SaveHistory";
import { uploadImage } from "../Helpers/UploadImage";

const minConfidence = 90;

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
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classResult = tf.argMax(prediction, 1).dataSync()[0];

    const classes = ["Dark", "Green", "Light", "Medium"];
    const result = classes[classResult];

    if (confidenceScore < minConfidence) {
      return response400(res, "Gagal melakukan prediksi (akurasi rendah)");
    }

    const suggestion = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ];

    const uploadedImage = await uploadImage(image);

    await saveHistory({
      user_id: req.app.get("user"),
      type: "roasting",
      classResult: result,
      numericResult: classResult,
      image: uploadedImage,
    });

		return response200(res, "Berhasil melakukan prediksi", {
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
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classResult = tf.argMax(prediction, 1).dataSync()[0];

    if (confidenceScore < minConfidence) {
      return response400(res, "Gagal melakukan prediksi (akurasi rendah)");
    }

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

    const uploadedImage = await uploadImage(image);

    await saveHistory({
      user_id: req.app.get("user"),
      type: "daun",
      classResult: result,
      numericResult: classResult,
      image: uploadedImage,
    });

    return response200(res, "Berhasil melakukan prediksi", {
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

    const classes = ["Berry Borer", "Damaged", "Healthy"];

    const prediction = model.predict(tensor) as tf.Tensor;
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classResult = tf.argMax(prediction, 1).dataSync()[0];

    if (confidenceScore < minConfidence) {
      return response400(res, "Gagal melakukan prediksi (akurasi rendah)");
    }

    const result = classes[classResult];
    const suggestion = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ];

    const uploadedImage = await uploadImage(image);

    await saveHistory({
      user_id: req.app.get("user"),
      type: "biji",
      classResult: result,
      numericResult: classResult,
      image: uploadedImage,
    });

    return response200(res, "Berhasil melakukan prediksi", {
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