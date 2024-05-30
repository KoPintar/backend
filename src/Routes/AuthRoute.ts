import { Router } from "express";
import * as AuthController from "../Controllers/AuthController";

const router: Router = Router();

router.post("/register", AuthController.register);

export default router;