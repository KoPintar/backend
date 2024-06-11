import { Router } from "express";
import * as SuggestionController from "../Controllers/SuggestionController";

const router: Router = Router();

router.post("/", SuggestionController.addSuggestion);

export default router;
