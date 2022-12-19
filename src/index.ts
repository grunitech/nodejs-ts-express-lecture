import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { handleForm } from './handle-form';
import { greetMe } from './greet-me';

// creating an express application
const app = express();

// the post/put request come with data in form/url encoding
app.use(bodyParser.urlencoded());

// the post/put request come with data in json encoding
// app.use(bodyParser.json());

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

function getRandomMessage(msgs: string[]) {
    const idx = Math.floor(Math.random() * msgs.length);
    return msgs[idx];
}

app.get('/random', (req: Request, res: Response) => {
    res
        .status(200)
        .header('content-type', 'text/plain')
        .send(getRandomMessage(MESSAGES));
});

app.post('/handle-form', handleForm);

/**
 * All requests that start with "/greet" and have some name after it
 * /greet -> no
 * /greet/ran -> yes
 * /greet/run/12 -> yes
 * /greet/run/12/any -> no
 */
app.get('/greet/:name/:age?', greetMe);



app.listen(3000, () => {
    console.log('Express is running at port 3000');
});


