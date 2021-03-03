export interface Observation {
    observation: object;
    reward: number;
    done: boolean;
    info: Map<string, any> | null;
}

export interface Range {
    min: number;
    max: number;
}

export default abstract class AbstractEnvironment {
    protected metadata: Map<string, any>;

    constructor(metadata?: Map<string, any>) {
        if (!metadata) {
            metadata = new Map<string, any>();
        }
        if (!metadata.has("render_mode")) {
            metadata.set("render_mode", []);
        }

        this.metadata = metadata;
    }

    get spec(): any | null {
        return null;
    }

    get rewardRange(): Range {
        return { min: Number.NEGATIVE_INFINITY, max: Number.POSITIVE_INFINITY };
    }

    abstract get name(): string;
    abstract get actionSpace(): any[];
    abstract get isDone(): boolean;
    abstract get observationSpace(): any;

    abstract step(action: any): Observation;
    abstract reset(): void;
    abstract render(mode: string): void;
    abstract close(): void;

    seed(seed: string): void {}
}
