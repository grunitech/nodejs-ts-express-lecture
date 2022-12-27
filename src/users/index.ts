import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import auth from '../middlewares/auth';

export interface User {
    email: string;
    name: string;
}

function validateUser(user: User) {
    if (!Object.keys(user).length) {
        throw new Error('missing inputs');
    }
    if (!user.email) {
        throw new Error('missing email');
    }
    if (!user.name) {
        throw new Error('missing name');
    }
    return user;
}

export const users = Router();

// this middleware will run before any route in this router
users.use(auth);

// fetch all users
// fetch specific user
users.get('/:id?', (req: Request, res: Response) => {
    const id = req.params.id;
    if (id) {
        const user: User = {name: 'Server User', email: 'test@test.org'};
        res.send(user);
    } else {
        res.send([]);
    }
})

export function saveUser(req: Request, res: Response) {
    try {
        res.send(validateUser(req.body as unknown as User));
    } catch (e) {
        res.status(400).send({message: e.message});
    }
}

// save a new user
users.post('/', bodyParser.json(), saveUser);

// update a user
users.put('/', bodyParser.json(), (req: Request, res: Response) => {
    const user = req.body;
    if (!user.name || !user.email) {
        res.status(400).send({message: 'the input is invalid'});
    } else {
        res.send({userUpdated: true});
    }
});


// remove a user
users.delete('/:id', (req: Request, res: Response) => {
    res.send({message: `user ${req.params.id} deleted`});
});


export default users;
