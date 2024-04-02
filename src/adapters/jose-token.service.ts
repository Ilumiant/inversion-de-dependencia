import * as jose from 'jose'
import { TokenService } from "../ports/token.service";
import { createSecretKey } from 'crypto';

export class JoseTokenService implements TokenService {
  generate = async (payload: any): Promise<string> => {

    const secretKey = createSecretKey('123456', 'utf-8');

    const token = await new jose.SignJWT(payload) // details to  encode in the token
      .setProtectedHeader({ alg: 'HS256' }) // algorithm
      .setExpirationTime("1y") // token expiration time, e.g., "1 day"
      .sign(secretKey);

    return token
  }

  verify = async (token: string): Promise<any> => {
    const secret = new TextEncoder().encode('123456')
    const { payload, protectedHeader } = await jose.jwtVerify(token, secret)
    return payload
  }
  
}