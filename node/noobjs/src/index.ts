import * as dotenv from 'dotenv';
import https from 'https';
import http from 'http';
import {Request, Response} from 'express';

import Application from './Application';

dotenv.config();
const protocol = (process.env.SERVER_HTTPS === "true" ? https : http);
const hostName = process.env.SERVER_HOST || "127.0.0.1";
const port = parseInt(process.env.SERVER_PORT || "3000", 10);

const app = new Application(protocol.createServer);
app.addRoutes([
    {
        method: "get",
        path: "/",
        args: [ (req: Request, res: Response) => { res.send("hello world"); } ]
    }
]);

app.start(hostName, port);