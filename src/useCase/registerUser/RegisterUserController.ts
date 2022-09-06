import { Request, Response } from "express";
import { RegisterUserUseCase } from "./RegisterUserUseCase";

export class RegisterUserController {
  async handle(request: Request, response: Response) {
    const { name, password, username, email } = request.body;
    const registerUserUseCase = new RegisterUserUseCase();
    const user = await registerUserUseCase.execute({
      name,
      password,
      username,
      email,
    });
    return response.json(user);
  }
}
