import { Router } from "express";
import * as AuthController from "../Controllers/AuthController";
import { RegisterValidator } from "../Validators/RegisterValidator";
import { LoginValidator } from "../Validators/LoginValidator";

const router: Router = Router();

router.post("/register", RegisterValidator, AuthController.register);
router.post("/login", LoginValidator, AuthController.login);

export default router;