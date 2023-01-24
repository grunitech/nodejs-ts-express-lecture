import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../services/auth-service';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token as string;
  if (!token) {
    next(new Error('you shall not pass!!!'));
  }

  try {
    const { email } = verifyJWT<{ email: string }>(token);
    // req.user = email;
    next();
  } catch (e) {
    next(new Error('you shall not pass!!!'));
  }
}
