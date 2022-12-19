import { Request, Response } from 'express';

// http://localhost:3000/greet/<name>/<age>
export function greetMe(req: Request, res: Response) {
    const name = req.params.name;
    const age = req.params.age;
    res.send(`Hello ${name}, your age is ${age}`);
}
