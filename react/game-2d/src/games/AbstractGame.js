export default class AbstractGame {
    #name;
    #canvas;
    #context;
    #width;
    #height;
    constructor({ name, canvas, width, height }) {
        if (this.constructor === AbstractGame) {
            throw new TypeError('Abstract class "AbstractGame" cannot be instantiated directly');
        }

        this.#name = name;
        this.#canvas = canvas;
        this.#width = width || canvas?.width || 0;
        this.#height = height || canvas?.height || 0;
    }

    start() {
        throw new TypeError('Abstract method "start" must be implemented');
    }

    stop() {
        throw new TypeError('Abstract method "stop" must be implemented');
    }

    get name() { return this.#name; }

    get context() { return this.#context; }

    get canvas() { return this.#canvas; }
    set canvas(canvas) {
        this.#canvas = canvas;
        this.#context = canvas?.getContext("2d");
        this.#width = canvas?.width || this.#width;
        this.#height = canvas?.height || this.#height;
    }

    get width() { return this.#width; }
    set width(width) {
        this.#width = width;

        if (this.#canvas)
            this.#canvas.width = width;
    }

    get height() { return this.#height; }
    set height(height) {
        this.#height = height;

        if (this.#canvas)
            this.#canvas.height = height;
    }
}