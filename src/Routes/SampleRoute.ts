import { Router } from "express";
import * as SampleController from "../Controllers/SampleController";

const router: Router = Router();

router.get("/", SampleController.getSample);
router.get("/:id", SampleController.getDetailSample);
router.post("/", SampleController.createSample);
router.put("/:id", SampleController.updateSample);
router.delete("/:id", SampleController.deleteSample);

export default router;