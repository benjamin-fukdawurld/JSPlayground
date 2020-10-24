class Rect {
    constructor({ x, y, width, height }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get topLeft() { return { x: this.x, y: this.y }; }
    get topRight() { return { x: this.x + this.width, y: this.y }; }
    get bottomLeft() { return { x: this.x, y: this.y + this.height }; }
    get bottomRight() { return { x: this.x + this.width, y: this.y + this.height }; }
    get center() { return { x: this.x + this.width / 2, y: this.y + this.height / 2 }; }

    collide(other) {
        return Math.abs(other.center.x - this.center.x) <= other.width + this.width
            && Math.abs(other.center.y - this.center.y) <= other.height + this.height;
    }

    distance(order = 2) {
        if (order === 1) {
            return Math.abs(other.center.x - this.center.x)
                + Math.abs(other.center.y - this.center.y)
        }

        return Math.pow(
            Math.pow(Math.abs(other.center.x - this.center.x), order)
            + Math.pow(Math.abs(other.center.y - this.center.y), order),
            1 / order
        );
    }
}
