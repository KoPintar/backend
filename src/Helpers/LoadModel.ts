import * as tf from "@tensorflow/tfjs-node";

export async function profileRoasting() {
	return tf.loadGraphModel(process.env.MODEL_ROASTING_URL!);
}

export async function daun() {
  return tf.loadGraphModel(process.env.MODEL_DAUN_URL!);
}

export async function biji() {
	return tf.loadGraphModel(process.env.MODEL_BIJI_URL!);
}