export default class Rect {
    #position;
    #width;
    #height;
    constructor({ position, width, height }) {
        this.#position = { x: position.x || 0, y: position.y || 0 };
        this.#width = width || 0;
        this.#height = height || 0;
    }

    get position() { return this.#position; }
    set position(pos) {
        this.#position.x = pos.x || this.#position.x;
        this.#position.y = pos.y || this.#position.y;
    }

    get width() { return this.#width; }
    set width(value) {
        if (value >= 0)
            this.#width = value;
    }

    get height() { return this.#height; }
    set height(value) {
        if (value >= 0)
            this.#height = value;
    }

    get top() { return this.#position.y; }
    set top(value) { this.#position.y = value; }

    get bottom() { return this.#position.y + this.#height; }
    set bottom(value) { this.#position.y = value - this.#height; }

    get left() { return this.#position.x; }
    set left(value) { this.#position.x = value; }

    get right() { return this.#position.x + this.#width; }
    set right(value) { this.#position.x = value - this.#width; }

    get center() {
        return {
            x: this.#position.x + (this.#width / 2),
            y: this.#position.y + (this.#height / 2)
        };
    }

    set center(value) {
        this.#position.x = value.x - (this.#width / 2);
        this.#position.y = value.y - (this.#height / 2);
    }

    render(context, style = { fill: true, stroke: false }) {
        context.beginPath();
        context.rect(this.left, this.top, this.width, this.height);
        if (style.fill)
            context.fill();
        if (style.stroke)
            context.stroke();
        context.closePath();
    }
}