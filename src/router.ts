import { Router } from "express";
import { RegisterUserController } from "./useCase/registerUser/RegisterUserController";

const router = Router();

const registerUserUseCase = new RegisterUserController();

router.post("/users",registerUserUseCase.handle);

export { router };