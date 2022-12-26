import { Request, Response } from 'express';

function isConnected() {
    return true;
}

export function isConnectedMw(req: Request, res: Response, next: NewableFunction) {
    if (isConnected()) {
        next();
    } else {
        res.status(401).send('go away');
    }

}
