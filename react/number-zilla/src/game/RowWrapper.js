import PositionWrapper from './PositionWrapper';

export default class RowWrapper {
    constructor({ index, numbers }) {
        this.index = index;
        this.numbers = numbers
    }

    get row() {
        return this.numbers[this.index];
    }

    get value() {
        let result = 0;
        this.row.forEach(number => number > 0 && ++result);

        return result;
    }

    get isEmpty() {
        return this.value <= 0;
    }

    get first() {
        let index = this.row.findIndex(number => number > 0);
        if (index < 0)
            return null;

        return new PositionWrapper({
            x: index,
            y: this.index,
            numbers: this.numbers
        });
    }

    get last() {
        let index = this.row.length - 1;
        while (index >= 0 && this.row[index] > 0)
            --index;

        if (index < 0)
            return null;

        return new PositionWrapper({
            x: index,
            y: this.index,
            numbers: this.numbers
        });
    }

    get end() {
        let index = this.row.length - 1;
        if (this.row[index] !== 0)
            return null;


        while (index > 0 && this.row[index - 1] === 0)
            --index;

        if (index < 0)
            return null;

        return new PositionWrapper({
            x: index,
            y: this.index,
            numbers: this.numbers
        });
    }
}
