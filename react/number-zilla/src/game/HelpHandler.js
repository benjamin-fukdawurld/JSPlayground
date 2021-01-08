import PositionWrapper from './PositionWrapper';
import RowWrapper from './RowWrapper';

export default class HelpHandler {
    constructor({ numbers, previous }) {
        this.numbers = numbers;
        this.previous = previous || null;
    }

    startPosition() {
        if (this.previous) {
            return {
                x: this.previous.p1.x,
                y: this.previous.p1.y
            };
        }

        let p = (new RowWrapper({ index: 0, numbers: this.numbers })).first;
        return {
            x: p.x,
            y: p.y
        };
    }

    arePlayable(p1, p2) {
        return p1 && p2 && p1.matches(p2);
    }

    next() {
        let start = this.startPosition();

        let current = new PositionWrapper({
            ...start,
            numbers: this.numbers
        });
        let other = null;
        let lastMove = this.previous?.move;
        let startDone = false;
        while (!startDone || !current.isLocatedAt(start)) {
            if (!lastMove) {
                other = current.left;
                lastMove = 'l';
            } else if (lastMove === 'l') {
                other = current.right;
                lastMove = 'r';
            } else if (lastMove === 'r') {
                other = current.top;
                lastMove = 't';
            } else if (lastMove === 't') {
                other = current.bottom;
                lastMove = 'b';
            } else if (lastMove === 'b') {
                current = current.right;
                other = null;
                startDone = true;
                lastMove = '';
            }

            if (this.arePlayable(current, other))
                return {
                    p1: { x: current.x, y: current.y },
                    p2: { x: other.x, y: other.y },
                    move: lastMove
                };
        }

        return null;
    }
}
