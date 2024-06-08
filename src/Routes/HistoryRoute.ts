import { Router } from "express";
import * as HistoryController from "../Controllers/HistoryController";

const router: Router = Router();

router.get("/", HistoryController.getHistory);

export default router;
