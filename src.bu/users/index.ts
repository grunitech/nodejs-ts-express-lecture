import { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { validateUser } from './user';
import { UserService } from '../services/user';

// working on the robot/check

/**
 * An example for creating an HTTP feature (express router) with
 * dependencies.
 *
 */

// todo input validation
// todo error handling

export default function Users(service: UserService): Router {

    async function getAllUsers(req: Request, res: Response) {
        const items = await service.all();
        res.send(items);
    }

    async function getUserById(req: Request, res: Response) {
        // read if from URL (param)
        // todo validation
        const id = req.params.id;
        const item = await service.one(id);
        res.send(item);
    }

    async function createUser(req: Request, res: Response) {
        validateUser(req.body);
        const results = await service.save(req.body);
        return results;
    }

    async function updateUser(req: Request, res: Response) {
        validateUser(req.body);
        const results = await service.save(req.body);
        return results;
    }

    function clientError(res: Response, message: string, code = 400) {
        res.status(code).send({message});
    }

    const users = Router();

    users.get('/', getAllUsers);
    users.get('/:id', getUserById)
    users.post('/', bodyParser.json(), createUser);
    users.put('/', bodyParser.json(), updateUser);

    return users;
}




