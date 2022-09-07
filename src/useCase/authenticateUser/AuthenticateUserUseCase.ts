import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";

interface IRequest {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: { username },
    });
    if (!userAlreadyExists) {
      throw new Error("User or password incorrect");
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error("User or password incorrect");
    }
    const token = sign({}, "499a6da6-e45e-4021-a74e-0b73cfc18e54", {
      subject: userAlreadyExists.id,
      expiresIn: "20s",
    });

    return { token };
  }
}
