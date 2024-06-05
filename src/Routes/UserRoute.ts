import { Router } from "express";
import * as UserController from "../Controllers/UserController";
import { UserValidator } from "../Validators/UserValidator";

const router: Router = Router();

router.put("/profile", UserValidator, UserController.updateUser);

export default router;
