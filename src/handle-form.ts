import { Request, Response } from 'express';

export function handleForm(req: Request, res: Response) {
    const name = 'Someone';
    res.send(`Hello ${name}`);
}
