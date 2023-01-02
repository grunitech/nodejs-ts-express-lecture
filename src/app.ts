import express from 'express';
import cors from 'cors';
import './db'; // make the connection to the database
import { users } from './users';

const app = express();

app.use(cors());

app.use('/user', users);

export default app;


