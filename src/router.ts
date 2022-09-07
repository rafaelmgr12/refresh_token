import { Router } from "express";
import { AuthenticateUserController } from "./useCase/authenticateUser/AuthenticateUserController";
import { RegisterUserController } from "./useCase/registerUser/RegisterUserController";

const router = Router();

const registerUserController = new RegisterUserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users",registerUserController.handle);
router.post("/login",authenticateUserController.handle);

export { router };