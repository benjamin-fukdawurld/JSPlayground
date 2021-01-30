import * as dotenv from 'dotenv';
import express from 'express';
import https from 'https';
import http from 'http';

import Application from './Application';

dotenv.config();
const protocol = (process.env.SERVER_HTTPS === "true" ? https : http);
const hostName = process.env.SERVER_HOST;
const port = parseInt(process.env.SERVER_PORT || "3000", 10);

const app = new Application(protocol.createServer);
app.expressApp.get('/', (req: any, res: any) => {
    res.send("hello world");
});

const server = protocol.createServer(app);
server.listen(port, hostName);


process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server terminated')
    })
});