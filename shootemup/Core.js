const DEFAULT_PORT = 3000;

function normalizePort(value) {
    let port = parseInt(value, 10);
    if (isNaN(port) || port < 0)
        return DEFAULT_PORT;

    return port;
}

const SERVER_PORT = normalizePort(process.env.PORT);

function getBindValue(address) {
    return typeof address === 'string' ? 'pipe ' + address : 'port: ' + SERVER_PORT;
}

function errorHandler(error) {
    if (error.syscall !== 'listen')
        throw error;

    const bind = getBindValue(server.address());
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
        default:
            throw error;
    }
};

exports.SERVER_PORT = SERVER_PORT;
exports.normalizePort = normalizePort;
exports.getBindValue = getBindValue
exports.errorHandler = errorHandler
