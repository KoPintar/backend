import { Request, Response } from "express";
import { response200, response201, response500, response404, response413 } from "../Helpers/Response";
import { Sample } from "../Models/Sample";

export async function getSample(req: Request, res: Response) {
	try {
		const samples = await Sample.findAll();
		return response200(res, "Data berhasil didapatkan", samples);
	} catch (error: any) {
		console.log(error);
		return response500(res, "Internal server error");
	}
}

export async function getDetailSample(req: Request, res: Response) {
	try {
		const sample = await Sample.findByPk(req.params.id);
		if (!sample) {
			return response413(res, "Data tidak ditemukan");
		}
		return response200(res, "Data berhasil didapatkan", sample);
	} catch (error: any) {
		console.log(error);
		return response500(res, "Internal server error");
	}
}

export async function createSample(req: Request, res: Response) {
	try {
		const sample = await Sample.create(req.body);
		return response201(res, "Data berhasil ditambahkan", sample);
	} catch (error: any) {
		console.log(error);
		return response500(res, "Internal server error");
	}
}

export async function updateSample(req: Request, res: Response) {
	try {
		const sample = await Sample.findByPk(req.params.id);
		if (!sample) {
			return response404(res, "Data tidak ditemukan");
		}
		await sample.update(req.body);
		return response200(res, "Data berhasil diupdate", sample);
	} catch (error: any) {
		console.log(error);
		return response500(res, "Internal server error");
	}
}

export async function deleteSample(req: Request, res: Response) {
	try {
		const sample = await Sample.findByPk(req.params.id);
		if (!sample) {
			return response404(res, "Data tidak ditemukan");
		}
		await sample.destroy();
		return response200(res, "Data berhasil dihapus", sample);
	} catch (error: any) {
		console.log(error);
		return response500(res, "Internal server error");
	}
}