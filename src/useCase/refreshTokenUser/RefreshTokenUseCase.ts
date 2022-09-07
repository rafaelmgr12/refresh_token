import dayjs from "dayjs";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

export class RefreshTokenUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: { id: refresh_token },
    });
    if(!refreshToken) {
      throw new Error("Unautorized");
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
            userId: refreshToken.userId
        }
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const newRefreshToken = generateRefreshToken.execute(refreshToken.userId)

    return { token, newRefreshToken }
    }

    return {token};

  }
}
