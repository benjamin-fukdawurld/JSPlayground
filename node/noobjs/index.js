require('dotenv').config();
const express = require('express');
const https = require('https');
const http = require('http');

const app = express();

app.get('/', (req, res) => {
    res.send("hello world");
});

const protocol = (process.env.SERVER_HTTPS === "true" ? https : http);
const server = protocol.createServer(app);
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);


process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server terminated')
    })
});
