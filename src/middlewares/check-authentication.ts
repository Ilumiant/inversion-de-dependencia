import { NextFunction, Request, Response } from "express";
import { TokenService } from "../ports/token.service";

export function checkAuthentication(tokenService: TokenService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const payload = await tokenService.verify(token);
      req.body.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalid' });
    }
  }
}