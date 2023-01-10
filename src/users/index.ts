import { NextFunction, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { User, validateFullUser, validateUser } from './user';
import getUserService from '../services/users-service';

function cleanUser({password, ...user}: User) {
    return user;
}

// Example to middleware *AFTER* the end point
// function cleanUserMiddleware(req: Request, res: Response, next: NextFunction) {
//
// }

async function getAllUsers(req: Request, res: Response) {
    const users = await getUserService().all();
    res.send(users.map(cleanUser));
}

async function getUserById(req: Request, res: Response) {
    // read if from URL (param)
    // todo validation (id is numeric)
    const id = req.params.id;
    const user = await getUserService().one(id);
    res.send(cleanUser(user));
}

async function createUser(req: Request, res: Response) {
    const user = validateUser(req.body);
    const savedUser = await getUserService().save(user);
    res.send(savedUser);
}

async function updateUser(req: Request, res: Response) {
    const user = validateFullUser(req.body);
    const updatedUser = await getUserService().update(user);
    res.send(updatedUser);
}

async function removeUser(req: Request, res: Response) {
    const id = req.params.id;
    await getUserService().remove(id);
    res.send({id});
}


// CRUD feature (Create, Read, Update, Delete)
const users = Router();


users.get('/', getAllUsers);
users.get('/:id', getUserById);
users.post('/', bodyParser.json(), createUser);
users.put('/', bodyParser.json(), updateUser);
users.delete('/:id', removeUser);

// localhost/user
// users.use(cleanUserMiddleware);


export default users;




