import express from 'express';
import cors from 'cors';
import { users } from './users';

const app = express();

app.use(cors());

app.use('/user', users);

export default app;


