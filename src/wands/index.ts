import { Router, Response, Request } from 'express';
import { wandsList } from './data';

const wands = Router();


wands.get('/wands', (req: Request, res: Response) => {
    res.send(wandsList());
});


export default wands;
