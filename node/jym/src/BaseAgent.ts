import AbstractEnvironment from "./AbstractEnvironment";
import stringhash from "string-hash-64";

export enum AgentStatus {
    NotRunning,
    Running,
    Success,
    Failure
}

export interface QValue {
    action: any;
    value: number;
}

export interface RateGenerators {
    learningRate: () => number;
    discountRate: () => number;
    explorationRate: () => number;
}

export class DefaultRateGenerators implements RateGenerators {
    constructor(
        readonly learning: number = 0.005,
        readonly discount: number = 0.95,
        readonly exploration: number = 0.08
    ) { }

    learningRate() {
        return this.learning;
    }

    discountRate() {
        return this.discount;
    }

    explorationRate() {
        return this.exploration;
    }
}

export interface QValueManager {
    initQValue(action: any): QValue;
    updateQValue: (value: QValue, reward: number, agent: BaseAgent, stateHash: number) => void;
}

export class DefaultQValueManager implements QValueManager {
    constructor(readonly initOffset: number = 10, readonly initRand: number = 1) { }

    initQValue(action: any): QValue {
        return { action, value: -this.initRand * Math.random() - this.initOffset };
    }

    updateQValue(value: QValue, reward: number, agent: BaseAgent, stateHash: number): void {
        let qValues = agent.getQValues(stateHash);
        if (!qValues || qValues.length === 0) {
            const status = agent.status;
            if (status == AgentStatus.Failure) {
                value.value = Number.MIN_VALUE;
            } else if (status == AgentStatus.Success) {
                value.value = Number.MAX_VALUE / agent.moveCount;
            } else if (status == AgentStatus.NotRunning) {
                throw new Error("Update QValue failure: Agent is not running");
            } else {
                throw new Error("Update QValue failure: no action to do");
            }
        }

        value.value =
            (1 - agent.learningRate) * value.value +
            agent.learningRate * (reward + agent.discountRate * BaseAgent.pickBestQValue(qValues).value);
    }
}

export default class BaseAgent {
    protected _env: AbstractEnvironment | null;
    protected qValues: Map<number, QValue[]>;
    protected _path: QValue[];
    constructor(
        qValues?: Map<number, QValue[]>,
        protected rateGenerators: RateGenerators = new DefaultRateGenerators(),
        protected qValuesManager: QValueManager = new DefaultQValueManager()
    ) {
        this.qValues = qValues || new Map<number, QValue[]>();
        this._env = null;
        this._path = [];
    }

    get env(): AbstractEnvironment | null {
        return this._env;
    }

    get status(): AgentStatus {
        if (!this._env) {
            return AgentStatus.NotRunning;
        } else if (this._env.isDone) {
            return AgentStatus.Success;
        } else if (this._env.observationSpace.table.length > 1000) {
            return AgentStatus.Failure;
        }

        return AgentStatus.Running;
    }

    get isDone(): boolean {
        return this.status !== AgentStatus.Running;
    }

    get isFailed(): boolean {
        return this.status !== AgentStatus.Failure;
    }

    get isSuccess(): boolean {
        return this.status !== AgentStatus.Success;
    }

    get learningRate(): number {
        return this.rateGenerators.learningRate();
    }

    get discountRate(): number {
        return this.rateGenerators.discountRate();
    }

    get explorationRate(): number {
        return this.rateGenerators.explorationRate();
    }

    get moveCount(): number {
        return this._path.length;
    }

    get path(): any[] {
        return this._path;
    }

    get currentQValues(): QValue[] {
        return this.getQValues(this.onStateChanged(this._env?.observationSpace.table));
    }

    get nextQValue() {
        return Math.random() > this.rateGenerators.explorationRate()
            ? this.currentBestQValue
            : this.currentRandomQValue;
    }

    get currentBestQValue(): QValue | null {
        let qValues = this.currentQValues;
        if (qValues.length === 0) {
            return null;
        }

        return BaseAgent.pickBestQValue(
            this.getQValues(this.onStateChanged(this._env?.observationSpace.table))
        );
    }

    get currentRandomQValue(): QValue | null {
        let qValues = this.currentQValues;
        if (qValues.length === 0) {
            return null;
        }

        return BaseAgent.pickRandomQValue(
            this.getQValues(this.onStateChanged(this._env?.observationSpace.table))
        );
    }

    start(_env: AbstractEnvironment): void {
        this._env = _env;
    }

    stop() {
        this._env = null;
    }

    step(): void {
        let qValue = this.nextQValue;
        if (!qValue) {
            throw new Error("Step failure: no action to do");
        }

        let observation = this._env?.step(qValue.action);
        this._path.push(qValue);
        this.updateQValue(qValue, observation);
    }

    getQValues(stateHash: number): QValue[] {
        return this.qValues.get(stateHash) || [];
    }

    static pickBestQValue(qValues: QValue[]): QValue {
        return qValues.reduce((best: QValue, qValue: QValue) => {
            return best.value > qValue.value ? best : qValue;
        }, qValues[0]);
    }

    static pickRandomQValue(qValues: QValue[]): QValue {
        return qValues[Math.floor(Math.random() * qValues.length)];
    }

    private onStateChanged(table: number[]): number {
        let stateHash = stringhash(JSON.stringify(this._env?.observationSpace.table));
        if (!this.qValues.has(stateHash)) {
            this.setupState(stateHash);
        }

        return stateHash;
    }

    private updateQValue(value: QValue, observation: any) {
        this.qValuesManager.updateQValue(
            value,
            observation.reward,
            this,
            this.onStateChanged(this._env?.observationSpace.table)
        );
    }

    private setupState(stateHash: number): void {
        if (!this._env) {
            throw new Error("Cannot setUp state: Environment is not set");
        }

        this.qValues.set(
            stateHash,
            this._env.actionSpace.map((action) => {
                return this.qValuesManager.initQValue(action);
            })
        );
    }
}
