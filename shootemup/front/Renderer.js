export default class Renderer {
    #canvas;
    #context;
    #fullscreen
    constructor({ canvasId, contextType, contextArgs, size }) {
        this.#canvas = document.getElementById(canvasId);
        this.#context = this.#canvas.getContext(contextType, contextArgs);
        this.#fullscreen = !!size.fullscreen;
        if (this.#fullscreen) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            window.addEventListener('resize', () => this.autoResize());
        }
    }

    get canvas() {
        return this.#canvas;
    }

    get context() {
        return this.#context;
    }

    get width() {
        return this.canvas.width;
    }

    set width(w) {
        this.canvas.width = w || this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    set height(h) {
        this.canvas.height = h || this.canvas.height;
    }

    get fullscreen() {
        return this.#fullscreen;
    }

    set fullscreen(value) {
        this.#fullscreen = !!value;
        if (this.#fullscreen) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            window.addEventListener('resize', () => this.autoResize());
        }
    }

    get size() {
        return { width: this.width, height: this.height };
    }

    set size({ width, height }) {
        this.width = width;
        this.height = height;
    }

    autoResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}
