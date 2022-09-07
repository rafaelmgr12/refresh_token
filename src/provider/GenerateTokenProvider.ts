import { sign } from "jsonwebtoken"

class GenerateTokenProvider {
    async execute(userId: string) {
        const token = sign({}, "499a6da6-e45e-4021-a74e-0b73cfc18e54", {
            subject: userId,
            expiresIn: "20s"
        })

        return token
    }

}

export { GenerateTokenProvider }