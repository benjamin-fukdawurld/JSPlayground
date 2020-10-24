import Game from "./Game"
import Level from "./Level"

class Sprite {
    #image
    #scale
    #area
    constructor(loadCallback) {
        this.#image = new Image();
        this.#scale = { width: 1, height: 1 };
        this.#area = { x: 0, y: 0, width: 0, height: 0 };
        img.addEventListener('load', loadCallback, false);
    }

    get width() { return this.#image.width; }
    get height() { return this.#image.height; }
    get size() {
        return { width: this.width, height: this.height };
    }

    get image() { return this.#image; }
    load(src) {
        this.image.src = src;
    }

    render(contex) {
        context.drawImage(current.resource, 0, 0, window.innerWidth, window.innerHeight);
    }
}


function main() {
    let level = new Level();
    let img = new Image();
    const game = new Game(60, (renderer) => {
        context.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    });
    img.addEventListener('load', function () {
        game.startRendering();
    }, false);
    img.src = 'images/background/bg-preview-big.png'

    //level.addResource(0, img);
    //view.level = level;
}


main();