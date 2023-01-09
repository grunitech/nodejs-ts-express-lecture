import { Router, Response, Request } from 'express';
import { saveWand, wandsList } from './data';
import { isConnectedMw } from '../is-connected';




const wands = Router();
wands.use(isConnectedMw);

wands.get('/about', (req, res) => {
    res.send({students: 'Grinithec Syidents'})
});

// /wands -> all wands
// /wands/<ID> -> wand in the ID index the list
wands.get('/', (req: Request, res: Response) => {
    res.send(wandsList());
});

wands.get('/:id', (req: Request, res: Response) => {
    const list = wandsList();
    const id = req.params?.id;

    const item = list[+id];
    if (item) {
        return res.send(item);
    }

    res.status(404);
});

wands.post('/:id', (req: Request, res: Response) => {
    const wand = req.body;
    console.log('Wand >>>>', wand);
    const id = +(req.params.id);
    // saveWand(wand, id);

    console.log('ID >>>', id);
    res.send({status: 'saved'});
});

export default wands;
