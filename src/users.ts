import { Router, Request, Response } from 'express';

export const users = Router();

//
// users.get('users', (req: Request, res: Response) => {
//
// });

// fetch all users
// fetch specific user
users.get('/users/:id?', (req: Request, res: Response) => {
    const id = req.params.id;
    if (id) {
        res.send({userId: id});
    } else {
        res.send([]);
    }
})

// save a new user
users.post('/users', () => {

});

// update a user
users.put('/users', () => {

});


// remove a user
users.delete('users/:id', () => {

});


export default users;
