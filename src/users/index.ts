import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import auth from '../middlewares/auth';
import client from '../db';

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
// users.use(auth);

// fetch all users
users.get('/', (req: Request, res: Response) => {
    // todo what happened if there are 2 billion records in the database?
    client
        .query('SELECT * FROM users')
        .then(results => results.rows)
        .then(users => res.send(users));
});

// fetch specific user
users.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const SQL = 'SELECT * FROM users WHERE id=$1';
    client
        .query(SQL, [id])
        .then(results => results.rows[0])
        .then(user => res.send(user));
})

export function saveUser(req: Request, res: Response) {
    try {
        res.send(validateUser(req.body as unknown as User));
    } catch (e) {
        res.status(400).send({message: e.message});
    }
}

// save a new user
// todo 1. read user from request
// todo 2. validate user
// todo 3. keep user in database
// todo 4. return the new user id
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
