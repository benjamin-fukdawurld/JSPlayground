/// <reference path="decls.d.ts" />
import fs from "fs";
import path from "path";
import events from 'events';

import NumberzillaEnvironment from "./NumberzillaEnvironment";
import Agent, { QValue } from "./BaseAgent";
import BaseAgent from "./BaseAgent";

interface ScenarioRecord {
    qValues: Map<number, QValue[]>;
    path: any[];
    score: number;
}

class Scenario extends events.EventEmitter {
    protected _episode: number;
    protected _bestScore: number | null;
    protected _bestPath: any[] | null;
    protected _isRunning: boolean;
    constructor(
        readonly maxNumberOfEpisodes: number,
        readonly maxNumberOfAction: number,
        private qValues?: Map<number, QValue[]>,
    ) {
        super();
        this._episode = -1;
        this._bestScore = null;
        this._bestPath = null;
        this._isRunning = false;
    }

    start(seed?: string): Promise<any> {
        if (!this.qValues) {
            this.qValues = new Map<number, QValue[]>();
        }
        return new Promise((resolve, reject) => {
            try {
                this.startSync(seed);
                resolve({
                    episodeCount: this._episode,
                    bestScore: this._bestScore,
                    bestPath: this._bestPath
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    startSync(seed?: string) {
        this._episode = 0;
        this._isRunning = true;

        this.emit("BeforeScenario", {
            best: {
                score: this._bestScore,
                path: this._bestPath
            }
        });

        while (this._isRunning && this._episode < this.maxNumberOfEpisodes) {
            this.step(seed);
            ++this._episode;
        }

        this.emit("AfterScenario", {
            episodeCount: this._episode,
            best: {
                score: this._bestScore,
                path: this._bestPath
            }
        });
    }

    stop() {
        this._isRunning = false;
    }

    load(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            Scenario.loadRecord(path)
                .then((record: ScenarioRecord) => {
                    this.qValues = record.qValues;
                    this._bestPath = record.path;
                    this._bestScore = record.score;
                    resolve();
                })
                .catch(err => reject(err))
        });
    }

    save(path: string, pretty?: boolean): Promise<void> {
        return Scenario.saveRecord(path, {
            qValues: this.qValues as Map<number, QValue[]>,
            path: this._bestPath as any[],
            score: this._bestScore as number
        }, pretty);
    }

    static loadRecord(path: string): Promise<ScenarioRecord> {
        return new Promise<ScenarioRecord>((resolve, reject) => {
            fs.promises.access(path, fs.constants.F_OK)
                .then(() => fs.promises.readFile(path))
                .then((data) => {
                    let parsed = JSON.parse(data.toString());
                    resolve({
                        path: parsed.path,
                        score: parsed.score,
                        qValues: new Map<number, QValue[]>()
                    });
                })
                .catch((err) => reject(err))
        });
    }

    static saveRecord(path: string, record: ScenarioRecord, pretty?: boolean): Promise<void> {
        return fs.promises.writeFile(
            path,
            JSON.stringify({
                qValues: [...record.qValues],
                path: record.path,
                score: record.score
            }, null, pretty ? '\t' : undefined));
    }

    private doAction(agent: BaseAgent, actionNumber: number) {
        this.emit("BeforeAction", {
            agent,
            actionNumber,
            episode: this._episode,
            best: {
                score: this._bestScore,
                path: this._bestPath
            }
        });
        agent.step();
        this.emit("AfterAction", {
            agent,
            actionNumber,
            episode: this._episode,
            best: {
                score: this._bestScore,
                path: this._bestPath
            }
        });
    }

    private updateBestScore(agent: Agent, finalState: any) {
        if (!this._bestScore || finalState.score >= this._bestScore) {
            this._bestScore = !this._bestScore ? finalState.score : Math.max(this._bestScore, finalState.score);
            if (!this._bestScore || this._bestScore < finalState.score) {
                this._bestScore = finalState.score;
                this._bestPath = agent.path;
            } else if (this._bestScore == finalState.score) {
                if (!this._bestPath || this._bestPath.length > agent.path.length) {
                    this._bestScore = finalState.score;
                    this._bestPath = agent.path;
                }
            }
        }
    }

    private setEpisodeUp(seed?: string) {
        let env = new NumberzillaEnvironment();
        let agent = new Agent(this.qValues);

        if (seed) {
            env.seed();
        }

        env.reset();
        agent.start(env);

        this.emit("BeforeEpisode", {
            agent,
            episode: this._episode,
            best: {
                score: this._bestScore,
                path: this._bestPath
            },
            state: env.observationSpace
        });

        return { env, agent };
    }

    private tearEpisodeDown(env: NumberzillaEnvironment, agent: Agent) {
        let finalState = env.observationSpace;
        this.updateBestScore(agent, finalState);

        this.emit("AfterEpisode", {
            agent,
            episode: this._episode,
            current: {
                score: env.observationSpace.score,
                path: agent.path
            },
            best: {
                score: this._bestScore,
                path: this._bestPath
            },
            state: env.observationSpace
        });

        agent.stop();
        env.close();
    }

    private step(seed?: string) {
        let { env, agent } = this.setEpisodeUp(seed);
        let actionNumber = 0;

        while (this._isRunning && !agent.isDone && actionNumber < this.maxNumberOfAction) {
            this.doAction(agent, actionNumber);
            ++actionNumber;
        }

        this.tearEpisodeDown(env, agent);
    }
}

let scenario = new Scenario(10000, 30);
let episodesOutPut = "";
let lines = 0;
let bestScore: number = Number.MAX_VALUE;

scenario.on("BeforeScenario", (data) => {
    console.log(`Scenario starts (last best score: ${data.best.score})`);
    if (data.best.score) {
        bestScore = data.best.score;
    }
});

scenario.on("AfterScenario", (data) => {
    if (episodesOutPut) {
        console.log(episodesOutPut);
    }

    console.log(`Scenario done (last best score: ${data.best.score})`);
});

scenario.on("BeforeEpisode", (data) => {
    //console.log(`Episode starts (last best score: ${data.best.score})`);
});

scenario.on("AfterEpisode", (data) => {
    if (data.current.score >= bestScore) {
        bestScore = data.current.score;
        episodesOutPut += `Episode done (score: ${data.current.score}, best score: ${data.best.score}))`;
        ++lines;
    }

    if (lines > 1000) {
        console.log(episodesOutPut);
        episodesOutPut = "";
        lines = 0;
    }
});

scenario.load(path.resolve(__dirname, "qvalues.json"))
    .then(() => scenario.start()
        .then((results: any) => {
            console.log("Scenario is done");
            console.log(JSON.stringify({
                episodeCount: results.episodeCount,
                bestScore: results.bestScore
            }, null, '  '));
            return scenario.save(path.resolve(__dirname, "qvalues.json"))
        })
        .then(() => console.log("Scenario record saved"))
        .catch(err => {
            console.error(JSON.stringify(err, null, '\t'));
        })
    )
    .catch(err => {
        console.log("Unable to load scenario, launching without initial data")
        scenario.start()
            .then((results: any) => {
                console.log("Scenario is done");
                console.log(JSON.stringify({
                    episodeCount: results.episodeCount,
                    bestScore: results.bestScore
                }, null, '  '));
                return scenario.save(path.resolve(__dirname, "qvalues.json"))
            })
            .then(() => console.log("Scenario record saved"))
            .catch(err => {
                console.error(JSON.stringify(err, null, '  '));
            });
    });
