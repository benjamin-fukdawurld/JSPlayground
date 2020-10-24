import Renderer from "./Renderer"

export default class Game {
    #expectedFps
    #renderer
    #lastRenderDuration
    #renderInterval
    constructor({ fps, renderCallback }) {
        this.#expectedFps = fps || 60;
        this.#renderer = new Renderer({
            canvasId: "drawingZone",
            contextType: "2d",
            size: { fullscreen: true }
        });
        this.#lastRenderDuration = 1;
    }

    get fps() { return 1000 / this.#lastRenderDuration }
    get expectedFps() { return this.#expectedFps; }
    get renderer() { return this.#renderer; }

    pauseRendering() {
        clearInterval(this.#renderInterval);
    }

    startRendering() {
        this.#renderInterval = setInterval(this.render.bind(this), 1000 / this.#expectedFps);
    }

    get level() { return this.#level; }
    set level(l) {
        clearInterval(this.#renderInterval);
        this.#level = l;
        if (!l)
            return;

    }



    render() {
        var date1 = new Date();
        renderCallback(this.renderer);
        var date2 = new Date();
        this.#lastRenderDuration = date2 - date1;
        console.log(this.fps);
    }
}