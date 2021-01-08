import TableWrapper from '../TableWrapper';

export default class Environment {
    #baseNumbers;
    #table;
    #addCount;
    constructor(random = false) {
        let numbers = null;
        if (!random) {
            numbers = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 1, 1, 2, 1, 3, 1, 4, 1],
                [5, 1, 6, 1, 7, 1, 8, 1, 9]
            ];
        } else {
            numbers = [new Array(9), new Array(9), new Array(9)];
            for (let i = 0; i < 3; ++i) {
                for (let j = 0; j < 9; ++j) {
                    numbers[i][j] = Math.max(1, (Math.ceil(Math.random() * 9)));
                }
            }
        }

        this.#baseNumbers = JSON.stringify(numbers);
        this.reset();
    }

    get action_space() {
        return [[], ...this.#table.playables];
    }

    reset() {
        this.#table = new TableWrapper({ numbers: JSON.parse(this.#baseNumbers) });
        this.#addCount = 0;
    }

    render() {
        for (let i = 0, imax = this.#table.numbers.length; i < imax; ++i) {
            let line = "";
            for (let j = 0; j < 9; ++j) {
                const val = this.#table.numbers[i][j];
                line += `${(val > 0 ? val : '_')} `;
            }
            console.info(line);
        }
    }

    step(action) {
        if (!action?.length) {
            this.#table.push()
        } else {
            this.#table.update(action)
        }

        return {
            observation: JSON.parse(JSON.stringify(this.#table.numbers)),
            reward: -this.#table.value - this.#addCount,
            done: this.#table.isDone
        }
    }
}