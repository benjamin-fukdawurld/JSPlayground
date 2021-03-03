/// <reference path="decs.d.ts"/>
import * as dotenv from 'dotenv';
import https from 'https';
import http from 'http';
import {Request, Response} from 'express';
import googleTrends from 'google-trends-api';

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
        args: [ (req: Request, res: Response) => {
            googleTrends.interestOverTime({keyword: 'python'})
            .then(function(results: any){
                results = JSON.parse(results);
                results = results.default.timelineData.map((data: any) => data.value[0]);
                res.json(results);
            })
            .catch(function(err: any){
                res.send(err);
            });
        } ]
    }
]);

app.start(hostName, port);
