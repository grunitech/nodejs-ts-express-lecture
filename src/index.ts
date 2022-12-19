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

app.listen(3000, () => {
    console.log('Express is running at port 3000');
});


