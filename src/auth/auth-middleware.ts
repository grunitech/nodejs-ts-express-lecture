import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../services/auth-service';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.token as string;
    if (!token) {
        next(new Error('you shell not pass!!!'));
    }

    try {
        const payload = verifyJWT(token) as {email: string};
        res.locals.email = payload.email;
        next();

    } catch (e) {
        next(new Error('you shell not pass!!!'));
    }
}
