import AbstractGame from './../AbstractGame';
import Ball from './Ball';
import Slider from './Slider';

import levelGenerators from './levelGenerators';

const States = {
    NotStarted: 0,
    Started: 1,
    Paused: 2,
    Lost: 3,
    Won: 4,
    Stopped: 4,
};

export default class Breakout extends AbstractGame {
    #ball;
    #slider;
    #sliderDir;
    #bricks;
    #horizontalNumberOfBricks;
    #verticalNumberOfBricks;
    #timerId;
    #fps;
    #state;
    constructor(props) {
        super({ name: "Breakout", ...props });
        this.#fps = 60;
        this.#horizontalNumberOfBricks = 12;
        this.#verticalNumberOfBricks = 25;
        this.#ball = new Ball();
        this.#slider = new Slider({ position: { x: 0, y: 0 } });
        this.#sliderDir = 0;
        this.#state = States.NotStarted;
    }

    get cellWidth() {
        return this.width / this.#horizontalNumberOfBricks;
    }

    get cellHeight() {
        return this.height / this.#verticalNumberOfBricks;
    }

    getCollisionPoint(ball) {
        let { x, y } = ball.position;
        let isColliding = false;
        if (x < ball.radius) {
            x = 0;
            isColliding = true;
        } else if (x > this.width - ball.radius) {
            x = this.width;
            isColliding = true;
        }

        if (y < ball.radius) {
            y = 0;
            isColliding = true;
        } else if (y > this.height - ball.radius) {
            y = this.height;
            isColliding = true;
        }

        return isColliding ? { x, y } : null;
    }

    getCollisionPointPromise(ball) {
        return new Promise((resolve, reject) => {
            let point = this.getCollisionPoint(ball);
            if (point)
                resolve({ collider: this, ball, point });
            else
                reject(ball)
        });
    }

    onCollision(ball, point) {
        let { x, y } = ball.direction;
        if (point.y >= this.height) {
            this.tearDown();
            this.#state = States.Lost;
            this.drawOverlay({
                text: "Lost Click to replay",
                textStyle: {
                    color: "#FFF"
                },
                overlayColor: "rgb(0, 0, 0, 30%)"
            });
        }
        if (point.x <= 0 || point.x >= this.width)
            x *= -1;
        if (point.y <= 0)
            y *= -1;

        ball.direction = { x, y };
    }

    handleClick(event) {
        if ([
            States.NotStarted,
            States.Won,
            States.Lost,
            States.Stopped,
        ].includes(this.#state)) {
            this.setup(0);
            this.#state = States.Started;
            this.#timerId = setInterval(this.update.bind(this), 1000 / this.#fps);
        } else if (this.#state === States.Paused) {
            this.#timerId = setInterval(this.update.bind(this), 1000 / this.#fps);
        } else if (this.#state === States.Started) {
            this.#state = States.Paused;
            this.tearDown();
            this.drawOverlay({
                text: "Paused Click to resume",
                textStyle: {
                    color: "#FFF"
                },
                overlayColor: "rgb(0, 0, 0, 30%)"
            });
        }
    }

    handleKeyDown(event) {
        if (event.key === "ArrowLeft")
            this.#sliderDir = -1.0;
        else if (event.key === "ArrowRight")
            this.#sliderDir = 1.0;
    }

    handleKeyUp(event) {
        if (event.key === "ArrowLeft")
            this.#sliderDir = 0.0;
        else if (event.key === "ArrowRight")
            this.#sliderDir = 0.0;
    }

    handleKeyPress(event) {
        if (event.key === 'Enter'
            && [
                States.NotStarted,
                States.Won,
                States.Lost,
                States.Stopped,
            ].includes(this.#state)) {
            this.setup(0);
            this.#state = States.Started;
            this.#timerId = setInterval(this.update.bind(this), 1000 / this.#fps);
        }
    }

    setup(level = 0) {
        this.#sliderDir = 0;
        this.#slider.position = {
            x: (this.width / 2) - (this.#slider.width / 2),
            y: this.height - 5 - this.#slider.height
        }
        this.#slider.width = this.cellWidth * 1.5;
        this.#ball.position = {
            x: this.width / 2,
            y: this.height - 5 - this.#slider.height - this.#ball.radius,
        };
        this.#ball.direction = {
            x: ((Math.random() * 2) - 1) * 3,
            y: -1
        };
        this.#bricks = levelGenerators[level](this.cellWidth, this.cellHeight);
    }

    tearDown() {
        if (this.#timerId)
            clearInterval(this.#timerId);
    }

    start() {
        this.#state = States.NotStarted;
        this.drawOverlay({
            text: "Click to start",
            textStyle: {
                color: "#FFF"
            },
            overlayColor: "rgb(0, 0, 0, 80%)"
        });
    }

    stop() {
        this.#state = States.Stopped
        this.tearDown();
    }

    drawBackGround() {
        this.context.beginPath();
        this.context.rect(0, 0, this.width, this.height);
        this.context.fillStyle = "#FFFFFF";
        this.context.fill();
        this.context.strokeStyle = "#000000";
        this.context.stroke();
        this.context.closePath();
    }

    drawMap() {
        this.context.beginPath();
        this.#bricks.forEach(element => {
            element.render(this.context);
        });
        this.context.closePath();
    }

    drawOverlay({
        text = "Click to start",
        textStyle = {},
        overlayColor = "rgb(0, 0, 0, 80%)"
    } = {}
    ) {
        this.context.beginPath();
        this.context.rect(0, 0, this.width, this.height);
        this.context.fillStyle = overlayColor;
        this.context.fill();
        this.context.closePath();
        this.context.font = textStyle?.font || "40px 'Roboto'";
        this.context.fillStyle = textStyle?.color || "#FFF";
        this.context.textBaseline = 'middle';
        this.context.textAlign = 'center';
        this.context.fillText(text, this.width / 2, this.height / 2);
    }

    update() {
        this.render();
        if (this.#sliderDir)
            this.#slider.move(this.#sliderDir, this.width);
        this.#ball.update(this, this.#slider, this.#bricks);
        this.#bricks = this.#bricks.filter(brick => brick.isAlive);
        if (!this.#bricks.length) {
            this.#state = States.Won;
            this.tearDown();
            this.drawBackGround();
            this.drawMap();
            this.#ball.render(this.context);
            this.drawOverlay({
                text: "You Win Click to replay",
                textStyle: {
                    color: "#FFF"
                },
                overlayColor: "rgb(0, 0, 0, 80%)"
            });
        }
    }

    render() {
        this.drawBackGround();
        this.drawMap();
        this.#slider.render(this.context);
        this.#ball.render(this.context);
    }
}