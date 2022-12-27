import express from 'express';
import cors from 'cors';
import { users } from './users';

const app = express();

app.use(cors());

app.use('/user', users);

app.listen(3003, '0.0.0.0', () => {
    console.log('server is running');
})















// import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { handleForm } from './handle-form';
// import { greetMe } from './greet-me';
// import users from './users';
// import wands from './wands';
// import loggerMiddleware from './logger-middleware';
//
// // creating an express application
// const app = express();
//
// // the post/put request come with data in form/url encoding
// app.use(bodyParser.urlencoded());
// app.use(cors());
// app.use(loggerMiddleware);
//
// // add router to our applicati
// //
// //
// // on
// app.use(users);
// app.use('/sharvitim', wands);
//
// // the post/put request come with data in json encoding
// // app.use(bodyParser.json());
//
// app.get('/', (req: Request, res: Response) => {
//     res.status(200).send('url: ' + req.url);
// });
//
// app.get('/about', loggerMiddleware, (req: Request, res: Response) => {
//     // todo replace the dirname with ESM version
//     const path = __dirname + '/about.html';
//     res.sendFile(path);
// });
//
// const MESSAGES = [
//     'Good Morning',
//     'Drop dead',
//     'How are you?',
//     'Go to sleep, you\'re tired',
//     'Have a lovely day'
// ];
//
// function getRandomMessage(msgs: string[]) {
//     const idx = Math.floor(Math.random() * msgs.length);
//     return msgs[idx];
// }
//
// app.get('/random', (req: Request, res: Response) => {
//     res
//         .status(200)
//         .header('content-type', 'text/plain')
//         .send(getRandomMessage(MESSAGES));
// });
//
// app.post('/handle-form', handleForm);
//
// /**
//  * All requests that start with "/greet" and have some name after it
//  * /greet -> no
//  * /greet/ran -> yes
//  * /greet/run/12 -> yes
//  * /greet/run/12/any -> no
//  */
// app.get('/greet/:name/:age?', greetMe);
//
// app.all('*', (req, res) => {
//     // keep this url in the  database for later investigation
//     res.send('404!!!');
// })
//
// app.listen(3000, () => {
//     console.log('Express is running at port 3000');
// });
//
//
