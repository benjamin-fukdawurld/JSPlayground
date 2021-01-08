export default class PositionWrapper {
    constructor({ x, y, numbers }) {
        this.x = x;
        this.y = y;
        this.numbers = numbers;
    }

    isLocatedAt({ x, y }) {
        return this.x === x && this.y === y;
    }

    equals({ x, y }) {
        return this.value === this.numbers[y][x]
    }

    isAdjacent({ x, y }) {
        return this.left?.isLocatedAt({ x, y })
            || this.right?.isLocatedAt({ x, y })
            || this.top?.isLocatedAt({ x, y })
            || this.bottom?.isLocatedAt({ x, y })
    }

    matches({ x, y }) {
        return (this.isAdjacent({ x, y })
            && (this.value === this.numbers[y][x] || this.value + this.numbers[y][x] === 10));
    }

    get value() {
        return this.numbers[this.y][this.x];
    }

    set value(val) {
        this.numbers[this.y][this.x] = val;
    }

    get left() {
        let { x, y } = this;
        --x;
        while (!this.isLocatedAt({ x, y })) {
            while (x >= 0) {
                if (this.numbers[y][x] > 0) {
                    return new PositionWrapper({ x, y, numbers: this.numbers });
                }
                --x;
            }
            x = 8;
            y = (y > 0 ? y - 1 : this.numbers.length - 1);
        }

        return null;
    }

    get right() {
        let { x, y } = this;
        ++x;
        while (!this.isLocatedAt({ x, y })) {
            while (x <= 8) {
                if (this.numbers[y][x] > 0) {
                    return new PositionWrapper({ x, y, numbers: this.numbers });
                }
                ++x;
            }
            x = 0;
            y = (y >= this.numbers.length - 1 ? 0 : y + 1);
        }

        return null;
    }

    get top() {
        let { x, y } = this;
        --y;
        while (y >= 0 && !this.isLocatedAt({ x, y })) {
            if (this.numbers[y][x] > 0) {
                return new PositionWrapper({ x, y, numbers: this.numbers });
            }
            --y;
        }

        return null;
    }

    get bottom() {
        let { x, y } = this;
        ++y;
        while (y < this.numbers.length && !this.isLocatedAt({ x, y })) {
            if (this.numbers[y][x] > 0) {
                return new PositionWrapper({ x, y, numbers: this.numbers });
            }
            ++y;
        }

        return null;
    }
}