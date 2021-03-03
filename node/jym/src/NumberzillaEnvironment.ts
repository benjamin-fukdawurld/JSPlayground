import AbstractEnvironment, { Observation } from "./AbstractEnvironment";
import seedrandom from "seedrandom";

interface NumberzillaPosition {
    row: number;
    col: number;
}

type NumberzillaMove = [NumberzillaPosition, NumberzillaPosition];

class NumberzillaCell {
    readonly row: NumberzillaRow;
    readonly index: number;
    constructor(row: NumberzillaRow, index: number) {
        this.row = row;
        this.index = index;
    }

    get table(): NumberzillaTable {
        return this.row.table;
    }

    get value() {
        return this.row.value(this.index);
    }

    set value(value: number) {
        this.row.setValue(this.index, value);
    }

    get position(): NumberzillaPosition {
        return {
            col: this.index,
            row: this.row.index
        };
    }

    get isSolved(): boolean {
        return this.value <= 0;
    }

    get isNull(): boolean {
        return this.value === 0;
    }

    solve(): void {
        if (this.isSolved) {
            throw new Error(`cell(${this.row.index}, ${this.index}) is already solved`);
        }

        this.value = -1;
    }

    match(other: number | NumberzillaCell): boolean {
        if (this.isSolved) {
            throw new Error("cell is already solved");
        }

        if (typeof other !== "number") {
            other = other.value;
        }

        if (other <= 0) {
            throw new Error("other is not a positive number");
        }

        return this.value === other || this.value + other === 10;
    }

    toString(): string {
        if (this.value > 0) {
            return `${this.value}`;
        }

        return `${this.value === 0 ? "_" : "X"}`;
    }

    get left(): NumberzillaCell | null {
        let colCount = this.table.colCount;
        let rowIndex = this.row.index;
        let colIndex = this.index - 1;
        do {
            if (colIndex < 0) {
                colIndex = colCount - 1;
                --rowIndex;
                if (rowIndex < 0) {
                    rowIndex = this.table.rowCount - 1;
                }
            }

            if (this.table.value(rowIndex, colIndex) > 0) {
                return this.table.cell(rowIndex, colIndex);
            }

            --colIndex;
        } while (rowIndex != this.row.index || colIndex != this.index);

        return null;
    }

    get right(): NumberzillaCell | null {
        let colCount = this.table.colCount;
        let rowIndex = this.row.index;
        let colIndex = this.index + 1;
        do {
            if (colIndex >= colCount) {
                colIndex = 0;
                ++rowIndex;
                if (rowIndex >= this.table.rowCount) {
                    rowIndex = 0;
                }
            }

            if (this.table.value(rowIndex, colIndex) > 0) {
                return this.table.cell(rowIndex, colIndex);
            }

            ++colIndex;
        } while (rowIndex != this.row.index || colIndex != this.index);

        return null;
    }

    get top(): NumberzillaCell | null {
        let rowIndex = this.row.index;
        let colIndex = this.index;
        do {
            --rowIndex;
            if (rowIndex < 0) {
                break;
            }

            if (this.table.value(rowIndex, colIndex) > 0) {
                return this.table.cell(rowIndex, colIndex);
            }
        } while (rowIndex != this.row.index || colIndex != this.index);

        return null;
    }

    get bottom(): NumberzillaCell | null {
        let rowIndex = this.row.index;
        let colIndex = this.index;
        do {
            ++rowIndex;
            if (rowIndex >= this.table.rowCount) {
                break;
            }

            if (this.table.value(rowIndex, colIndex) > 0) {
                return this.table.cell(rowIndex, colIndex);
            }
        } while (rowIndex != this.row.index || colIndex != this.index);

        return null;
    }
}

class NumberzillaRow {
    constructor(readonly table: NumberzillaTable, readonly index: number) { }

    get score(): number {
        let result = 0;
        for (let i = 0; i < this.table.colCount; ++i) {
            if (this.value(i) > 0) {
                result += this.value(i);
            }
        }

        return result;
    }

    cell(index: number): NumberzillaCell {
        return new NumberzillaCell(this, index);
    }

    value(index: number): number {
        return this.table.value(this.index, index);
    }

    setValue(index: number, value: number): void {
        this.table.setValue(this.index, index, value);
    }

    values(): number[] {
        const start = this.table.colCount * this.index;
        return this.table.values.slice(start, start + this.table.colCount + 1);
    }

    cells(): NumberzillaCell[] {
        let result: NumberzillaCell[] = [];
        for (let i = 0, imax = this.table.colCount; i < imax; ++i)
            result.push(new NumberzillaCell(this, i));
        return result;
    }

    toString(): string {
        let result = `[ ${this.cell(0)}`;
        for (let i = 1, imax = this.table.colCount; i < imax; ++i) {
            result += `, ${this.cell(i).toString()}`;
        }

        return result + " ]";
    }
}

class NumberzillaTable {
    protected _values: number[];
    protected _colCount: number;
    constructor() {
        this._values = [];
        this._colCount = 0;
    }

    get colCount() {
        return this._colCount;
    }

    get playableMoves(): NumberzillaMove[] {
        let results: NumberzillaMove[] = [];
        for (let row = 0, rmax = this.rowCount; row < rmax; ++row) {
            for (let col = 0, cmax = this.colCount; col < cmax; ++col) {
                let cell = this.cell(row, col);
                if (cell.isSolved) {
                    continue;
                }
                let other = cell.left;
                if (other && cell.match(other)) {
                    results.push([cell.position, other.position]);
                }
                other = cell.right;
                if (other && cell.match(other)) {
                    results.push([cell.position, other.position]);
                }
                other = cell.top;
                if (other && cell.match(other)) {
                    results.push([cell.position, other.position]);
                }
                other = cell.bottom;
                if (other && cell.match(other)) {
                    results.push([cell.position, other.position]);
                }
            }
        }

        return results;
    }

    get rowCount() {
        return this._values.length / this.colCount;
    }

    get values() {
        return this._values;
    }

    get score(): number {
        return this._values.reduce((accum, current) => accum - (current <= 0 ? 0 : 1), 0);
    }

    init(colCount: number, rng: Generator<number, void, number>): void {
        this._values = [];
        this._colCount = colCount;

        let current = rng.next();
        while (!current.done) {
            this._values.push(current.value as number);
            current = rng.next();
        }

        let remaining = this._values.length % this.colCount;
        if (remaining === 0) {
            return;
        }

        remaining = this.colCount - remaining;
        for (let i = 0; i < remaining; ++i) {
            this._values.push(0);
        }
    }

    row(index: number): NumberzillaRow {
        return new NumberzillaRow(this, index);
    }

    cell(row: number, col: number): NumberzillaCell {
        if (!Number.isInteger(row) || !Number.isInteger(col)) {
            throw new Error(`Cannot get cell(${row}, ${col}): invalid position`);
        }
        return new NumberzillaCell(this.row(row), col);
    }

    value(row: number, col: number): number {
        return this._values[row * this.colCount + col];
    }

    setValue(row: number, col: number, value: number): void {
        this._values[row * this.colCount + col] = value;
    }

    toString(): string {
        let result = `[\n\t${this.row(0).toString()}`;
        for (let i = 1, imax = this.rowCount; i < imax; ++i) {
            result += `,\n\t${this.row(i).toString()}`;
        }

        return result + "\n]";
    }

    play(move: NumberzillaMove) {
        let cell1 = this.cell(move[0].row, move[0].col);
        let cell2 = this.cell(move[1].row, move[1].col);

        if (cell1.isSolved) {
            throw new Error(`cell(${cell1.row.index}, ${cell1.index}) is already solved`);
        }

        if (cell2.isSolved) {
            throw new Error(`cell(${cell2.row.index}, ${cell2.index}) is already solved`);
        }

        if (!cell1.match(cell2)) {
            throw new Error(
                `cell(${cell1.row.index}, ${cell1.index}) does not match cell(${cell2.row.index}, ${cell2.index})`
            );
        }

        cell1.solve();
        cell2.solve();

        let i = 0,
            imax = this.rowCount;
        while (i < imax) {
            let row = this.row(i);
            if (row.score == 0) {
                this.removeRow(i);
                --imax;
            } else {
                ++i;
            }
        }
    }

    removeRow(index: number): void {
        if (index < 0 || index > this.rowCount) {
            throw new Error(
                `Cannot remove row n°${index}: invalid index, index must be in range [0, ${this.rowCount}]`
            );
        }

        let rowStart = index * this.colCount;
        if (index === this.rowCount - 1) {
            this._values = this._values.slice(0, rowStart);
            return;
        }

        this._values = [
            ...this._values.slice(0, rowStart),
            ...this._values.slice(rowStart + this.colCount)
        ];
    }

    append() {
        let end = this._values.length - 1;
        while (this.values[end] === 0) {
            --end;
            this._values.pop();
        }

        for (let i = 0; i <= end; ++i) {
            if (this._values[i] > 0) {
                this._values.push(this._values[i]);
            }
        }

        let remaining = this._values.length % this.colCount;
        if (remaining === 0) {
            return;
        }

        for (let i = 0, imax = this.colCount - remaining; i < imax; ++i) {
            this._values.push(0);
        }
    }
}

export default class NumberzillaEnvironment extends AbstractEnvironment {
    protected table: NumberzillaTable;
    private randomGenerator: () => Generator<number, void, number>;
    constructor(private columnCount: number = 9, metadata?: Map<string, any>) {
        super(metadata);
        this.randomGenerator = NumberzillaEnvironment.staticRng();
        this.table = new NumberzillaTable();
    }

    get name(): string {
        return "Numberzilla";
    }

    get actionSpace(): any[] {
        return ["append", ...this.table.playableMoves];
    }

    get isDone(): boolean {
        return this.table.score === 0;
    }

    get observationSpace(): any {
        return {
            score: this.table.score,
            table: [...this.table.values],
            done: this.isDone
        };
    }

    step(action: any): Observation {
        let score = this.table.score;
        if (action === "append") {
            this.table.append();
        } else {
            this.table.play(action as NumberzillaMove);
        }

        return {
            observation: {
                score: this.table.score,
                table: [...this.table.values],
                done: this.isDone
            },
            reward: this.table.playableMoves.length / (-score),
            done: score == 0,
            info: null
        };
    }

    reset(): void {
        this.table.init(this.columnCount, this.randomGenerator());
    }

    render(mode: string = "human"): void {
        console.log(`score: ${this.table.score}`);
        console.log(this.table.toString());
    }

    seed(seed?: string): void {
        if (seed === "static") {
            this.randomGenerator = NumberzillaEnvironment.staticRng();
        } else {
            this.randomGenerator = (() => {
                let that: NumberzillaEnvironment = this;
                let rng = seedrandom(seed);
                let i = 0;
                return function* () {
                    while (i++ < that.columnCount * 3) {
                        yield Math.min(1 + Math.floor(rng() * 9), 9);
                    }
                };
            })();
        }
    }

    close(): void { }

    private static staticRng() {
        return function* () {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
            yield 5;
            yield 6;
            yield 7;
            yield 8;
            yield 9;
            yield 1;
            yield 1;
            yield 1;
            yield 2;
            yield 1;
            yield 3;
            yield 1;
            yield 4;
            yield 1;
            yield 5;
            yield 1;
            yield 6;
            yield 1;
            yield 7;
            yield 1;
            yield 8;
            yield 1;
            yield 9;

            return;
        };
    }
}
