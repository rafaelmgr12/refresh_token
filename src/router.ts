import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./useCase/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "./useCase/refreshTokenUser/RefreshTokenController";
import { RegisterUserController } from "./useCase/registerUser/RegisterUserController";

const router = Router();

const registerUserController = new RegisterUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

router.post("/users", registerUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/refresh-token", refreshTokenController.handle);

router.get("/courses",ensureAuthenticated ,(request, response) => {
  return response.json([
    { id: 1, name: "NodeJS" },
    { id: 2, name: "ReactJS" },
    { id: 3, name: "React Native" },
    { id: 4, name: "Flutter" },
    { id: 5, name: "Elixir" },
  ]);
});

export { router };
