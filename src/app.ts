import express from 'express';
import cors from 'cors';
import users from './users';
import { login } from './auth/login';
import bodyParser from 'body-parser';

// this module is not testable!

// create express application (top level router)
const app = express();

// add the "cors" middleware for *all* our
// routes to support HTTP calls from different domains
app.use(cors());


app.post('/login', bodyParser.json(), async (req, res) => {
    const {email, password} = req.body;
    res.send({token: await login({email, password})});
});

app.use('/user', users);

export default app;


