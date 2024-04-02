import { sign, verify } from "jsonwebtoken";
import { TokenService } from "../ports/token.service";

export class JwtTokenService implements TokenService {

  generate = async (payload: any): Promise<string> => {
    return sign(payload, "123456", { expiresIn: "1y" });
  }

  verify = async (token: string): Promise<any> => {
    try {
      const payload = verify(token, "123456");
      return payload;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
  
}