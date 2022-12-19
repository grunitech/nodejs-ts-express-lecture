import { createServer, IncomingMessage, ServerResponse } from 'node:http';

function requestHandler(req: IncomingMessage, res: ServerResponse) {
    const url = req.url;
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({
        hello: 'world',
        url
    }));
}

const server = createServer(requestHandler);

server.listen(3000);
