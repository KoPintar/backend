import { History } from "../Models/History";

type History = {
	user_id: number;
	type: string;
	classResult: string;
	numericResult: number;
	image: string;
};

export async function saveHistory(data: History) {
	const { user_id, type, classResult, numericResult, image } = data;
	const history = await History.create({
		user_id,
    type,
    classResult,
    numericResult,
		image
  });

	return history;
}