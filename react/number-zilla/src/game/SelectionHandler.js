import PositionWrapper from './PositionWrapper';

export default class SelectionHandler {
    constructor(selection) {
        this.selection = selection;
    }

    clear() {
        this.selection = [];
    }

    update({ x, y }) {
        let selected = this.selection;
        let index = selected.findIndex(sel => sel.x === x && sel.y === y);
        if (index !== -1) {
            selected.splice(index, 1);
        } else if (selected.length >= 2) {
            selected = [{ x, y }];
        } else {
            selected.push({ x, y });
        }
    }

    check(numbers) {
        if (this.selection.length < 2)
            return null;

        const P1 = new PositionWrapper({
            ...this.selection[0],
            numbers: numbers
        });
        const P2 = new PositionWrapper({
            ...this.selection[1],
            numbers: numbers
        });

        this.clear();
        if (P1.matches(P2)) {
            P1.value *= -1;
            P2.value *= -1;
            return numbers;
        }

        return null;
    }
}
