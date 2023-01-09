import express from 'express';
import cors from 'cors';
import users from './users';

// this module is not testable!

// create express application (top level router)
const app = express();

// add the "cors" middleware for *all* our
// routes to support HTTP calls from different domains
app.use(cors());


app.use('/user', users);

export default app;


