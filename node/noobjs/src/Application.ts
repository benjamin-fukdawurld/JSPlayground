import express from 'express';
import http from 'http';
import https from 'https';

export type ServerGenerator = (app: Express.Application) => http.Server | https.Server | null;

export default class Application {
    private _expressApp: express.Application;
    private _serverGenerator: ServerGenerator;
    private _server: http.Server | https.Server | null;
    constructor(serverGenerator : ServerGenerator) {
        this._expressApp = express();
        this._serverGenerator = serverGenerator;
        this._server = null;
    }

    createServer() : Server | null {
        this._server = this._serverGenerator(this._expressApp);
        return this.server;
    }

    get server() : Server | null {
        return this._server;
    }

    start(hostname: string, port: number): void {
        if (!this._server) {
            throw new Error(
                "Server must be created via Applicaiton.createServer before starting Application"
            );
        }

        this._server.listen(port, hostName);
    }

    get expressApp() {
        return this._expressApp;
    }
}
