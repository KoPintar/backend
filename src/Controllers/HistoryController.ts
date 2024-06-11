import { Request, Response } from "express";
import { History } from "../Models/History";
import { response200, response500 } from "../Helpers/Response";

export async function getHistory(req: Request, res: Response) {
  try {
    const { type } = req.query;
    let histories;

    if (type == "hama") {
      histories = await History.findAll({
        where: {
          user_id: req.app.get("user"),
          type: ["daun", "biji"],
        },
      });
    } else if (type == "roasting") {
      histories = await History.findAll({
        where: {
          user_id: req.app.get("user"),
          type: "roasting",
        },
      });
    } else {
      histories = await History.findAll({
        where: {
          user_id: req.app.get("user"),
        },
      });
    }
		
    return response200(res, "Data berhasil didapatkan", histories);
  } catch (error: any) {
    console.log(error);
    return response500(res, "Internal server error");
  }
}