import { NextFunction, Request, Response } from 'express';

export default function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers?.bootcamp;
    if ('1' === authHeader) {
        next();
    } else {
        // next(new Error('unauthenticated'));
        res.status(401).send({message: 'unauthenticated'});
    }
}
