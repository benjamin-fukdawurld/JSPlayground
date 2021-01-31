import express from 'express';
import http from 'http';
import https from 'https';

export type ServerGenerator = (app: Express.Application) => http.Server | https.Server | null;
type Server = http.Server | https.Server;
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

    start(hostName: string, port: number): void {
        if (!this._server) {
            this.createServer();
        }

        if(!this._server) {
            throw new Error("The server has not been created, something went wrong");
        }

        this._server.listen(port, hostName);
    }

    get expressApp() {
        return this._expressApp;
    }

    get(path: string, ...args : any) {
        return this._expressApp.get(path, ...args);
    }

    post(path: string, ...args : any) {
        return this._expressApp.post(path, ...args);
    }

    put(path: string, ...args : any) {
        return this._expressApp.put(path, ...args);
    }

    patch(path: string, ...args : any) {
        return this._expressApp.patch(path, ...args);
    }

    delete(path: string, ...args : any) {
        return this._expressApp.delete(path, ...args);
    }

    head(path: string, ...args : any) {
        return this._expressApp.head(path, ...args);
    }

    trace(path: string, ...args : any) {
        return this._expressApp.trace(path, ...args);
    }

    connect(path: string, ...args : any) {
        return this._expressApp.connect(path, ...args);
    }

    options(path: string, ...args : any) {
        return this._expressApp.options(path, ...args);
    }

    addRoute(method: string, path: string, ...args: any) {
        if(method === "get")
            this.get(path, ...args);
        if(method === "post")
            this.post(path, ...args);
        if(method === "put")
            this.put(path, ...args);
        if(method === "patch")
            this.patch(path, ...args);
        if(method === "delete")
            this.delete(path, ...args);
        if(method === "head")
            this.head(path, ...args);
        if(method === "trace")
            this.trace(path, ...args);
        if(method === "connect")
            this.connect(path, ...args);
        if(method === "options")
            this.options(path, ...args);
    }

    addRoutes(routes: {method: string, path: string, args: any[]}[]) {
        routes.forEach(route => this.addRoute(route.method, route.path, ...route.args));
    }
}
