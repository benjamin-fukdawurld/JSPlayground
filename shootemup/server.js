require('dotenv').config();
const Core = require('./Core');

const http = require('http');
const app = require('./app');

app.set('port', Core.SERVER_PORT);

const server = http.createServer(app);

server.on('error', Core.errorHandler);
server.on('listening', () => {
    console.log('Listening on ' + Core.getBindValue(server.address()));
});

server.listen(Core.SERVER_PORT);
