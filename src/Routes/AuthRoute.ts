import { Router } from "express";
import * as AuthController from "../Controllers/AuthController";
import { RegisterValidator } from "../Validators/RegisterValidator";

const router: Router = Router();

router.post("/register", RegisterValidator, AuthController.register);
router.post("/login", AuthController.login);

export default router;