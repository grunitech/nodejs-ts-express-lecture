import { NextFunction, Response, Request } from 'express';

export default function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const {url, hostname} = req;
    console.log('>>>>', url, hostname);
    next();
}
