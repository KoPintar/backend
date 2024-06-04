import { Router } from "express";
import * as AuthController from "../Controllers/AuthController";
import { RegisterValidator } from "../Validators/RegisterValidator";
import { LoginValidator } from "../Validators/LoginValidator";
import { ForgotPasswordValidator } from "../Validators/ForgotPasswordValidator";
import { ResetPasswordValidator } from "../Validators/ResetPasswordValidator";

const router: Router = Router();

router.post("/register", RegisterValidator, AuthController.register);
router.post("/login", LoginValidator, AuthController.login);
router.post("/forgot-password", ForgotPasswordValidator, AuthController.forgotPassword);
router.post("/reset-password", ResetPasswordValidator, AuthController.resetPassword);

export default router;