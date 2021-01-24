import * as dotenv from 'dotenv';
import express from 'express';
import https from 'https';
import http from 'http';

dotenv.config();
const app = express();

const hostName = process.env.SERVER_HOST;
const port = parseInt(process.env.SERVER_PORT || "3000", 10);

app.get('/', (req, res) => {
    res.send("hello world");
});

const protocol = (process.env.SERVER_HTTPS === "true" ? https : http);
const server = protocol.createServer(app);
server.listen(port, hostName);


process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server terminated')
    })
});