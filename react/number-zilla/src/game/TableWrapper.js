import RowWrapper from './RowWrapper';
import PositionWrapper from './PositionWrapper';
import HelpHandler from './HelpHandler';

export default class TableWrapper {
    #numbers;
    constructor({ numbers }) {
        this.#numbers = numbers;
    }

    get numbers() {
        return this.#numbers;
    }

    get value() {
        let result = 0;
        for (let row of this.#numbers) {
            for (let col of row) {
                if (col > 0)
                    result -= col;
            }
        }

        return result;
    }

    get isDone() {
        for (let row of this.#numbers) {
            for (let col of row) {
                if (col > 0)
                    return false;
            }
        }

        return true;
    }

    get playables() {
        let result = new Map();
        let handler = new HelpHandler({
            numbers: this.#numbers,
            previous: null
        });
        let current = handler.next();
        if (!current)
            return [];

        do {
            let playable = [current.p1, current.p2];
            let key = JSON.stringify(playable);
            let revKey = JSON.stringify([current.p2, current.p1])
            if (result.has(key))
                break;

            if (!result.has(revKey))
                result.set(key, playable);

            handler.previous = current;
            current = handler.next();
        } while (current != null)

        return [...result.values()];
    }

    getPlayablePromise() {
        return new Promise((resolve) => {
            resolve(this.playables);
        })
    }

    row(index) {
        return new RowWrapper({
            index, numbers: this.#numbers
        });
    }

    cell(row, col) {
        return new PositionWrapper({ x: col, y: row, numbers: this.#numbers });
    }

    concat() {
        let numbers = JSON.parse(JSON.stringify(this.#numbers));
        let row = numbers.length - 1;
        let wrapper = new RowWrapper({ index: row, numbers });
        let col = wrapper.end?.x;
        if (!col) {
            ++row;
            col = 0;
            numbers.push(Array(9).fill(0));
        }
        for (let inputRow of this.#numbers) {
            for (let number of inputRow) {
                if (number <= 0)
                    continue;

                if (col > 8) {
                    ++row;
                    col = 0;
                    numbers.push(Array(9).fill(0));
                }

                numbers[row][col] = number;
                ++col;
            }
        }

        return numbers;
    }

    getConcatPromise() {
        return new Promise((resolve) => {
            resolve(this.concat())
        })
    }

    push() {
        this.#numbers = this.concat();
        return this;
    }

    updated(positions) {
        let numbers = this.#numbers;
        if (positions) {
            let p1 = this.cell(positions[0].y, positions[0].x);
            let p2 = this.cell(positions[1].y, positions[1].x);
            if (!p1.matches(p2)) {
                throw Error("positions "
                    + JSON.stringify(p1)
                    + " and "
                    + JSON.stringify(p2)
                    + "do not match each other"
                );
            }

            p1.value *= -1;
            p2.value *= -1;
        }

        return numbers.filter((row, index) => {
            return !((new RowWrapper({
                index,
                numbers: this.#numbers
            })).isEmpty)
        });
    }

    update(positions) {
        this.#numbers = this.updated(positions);
        return this;
    }
}