import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import validator from 'validator';
import client from '../db';
import { validateUser } from './user';


export const users = Router();


function clientError(res: Response, message: string, code = 400) {
    res.status(code).send({message});
}

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
    // read if from URL (param)
    const id = req.params.id;

    // if id is not number, there is no reason to query the database
    if (!validator.isNumeric(id)) {
        return clientError(res, 'This URL is not value');
    }

    const SQL = 'SELECT * FROM users WHERE id=$1';
    client
        .query(SQL, [id])
        .then(results => results.rows[0])
        .then(user => res.send(user));
})


// save a new user
users.post('/', bodyParser.json(), (req: Request, res: Response) => {
    try {
        const {email, password, lname, fname} = validateUser(req.body);
        const SQL = `INSERT INTO users (email, password, lname, fname) VALUES ($1, $2, $3, $4) RETURNING id`;
        client
            .query(SQL, [email, password, lname, fname])
            .then(results => {
                const id = results.rows[0].id;
                res.send({id});
            });
    } catch (e) {
        clientError(res, e.message);
    }
});

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
