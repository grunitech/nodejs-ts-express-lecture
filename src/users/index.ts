import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import auth from '../middlewares/auth';

export interface User {
    email: string;
    name: string;
}

export const users = Router();

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

// save a new user
users.post('/', bodyParser.json(), (req: Request, res: Response) => {
    const user = req.body;
    res.send(user);
});

// update a user
users.put('/', () => {

});


// remove a user
users.delete('/:id', () => {

});


export default users;
