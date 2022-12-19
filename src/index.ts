import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('url: ' + req.url);
});

// todo this method should send an HTML file to the user
app.get('/about', (req: Request, res: Response) => {
    // todo implement me
});

app.listen(3000, () => {
    console.log('Express is running at port 3000');
});


