import { Request, Response } from 'express';

// handle data from query string
// http://localhost:3000/handle-form?name=XXXXX
// export function handleForm(req: Request, res: Response) {
//     res.send(`Hello ${req.query.name}`);
// }


// handle data from post body
export function handleForm(req: Request, res: Response) {
    const {name, age} = req.body;
    res.send(`Hello ${name}, your age is ${age}`);
}
