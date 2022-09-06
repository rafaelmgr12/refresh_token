import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface IUserRequest {
  name: string;
  password: string;
  email: string;
  username: string;
}

export class RegisterUserUseCase {
  async execute({ name, password, username, email }: IUserRequest) {
    // Verificar se o usuário existe

    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    // Cadastrar o usuário existe

    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: { name, password: passwordHash, username, email },
    });
    return user;
  }
}
