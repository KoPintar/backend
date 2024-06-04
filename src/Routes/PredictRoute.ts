import { Router } from "express";
import * as PredictController from "../Controllers/PredictController";
import multer from "multer";

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/roasting", upload.single("image"), PredictController.roasting);
router.post("/daun", upload.single("image"), PredictController.daun);

export default router;
