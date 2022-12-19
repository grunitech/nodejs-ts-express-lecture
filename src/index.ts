import express, { Request, Response, NextFunction } from 'express';

// creating an express application
const app = express();


app.get('/', (req: Request, res: Response) => {
    res.status(200).send('url: ' + req.url);
});

app.get('/about', (req: Request, res: Response) => {
    const path = __dirname + '/about.html';
    res.sendFile(path);
});

const MESSAGES = [
    'Good Morning',
    'Drop dead',
    'How are you?',
    'Go to sleep, you\'re tired',
    'Have a lovely day'
];

app.get('/random', (req: Request, res: Response) => {
    // on calling "http://localhost:3000/random" send a random message
    // the response should be "text/plain" and status code 200
});

app.listen(3000, () => {
    console.log('Express is running at port 3000');
});


