import Rect from '../Rect';

export default class Slider extends Rect {
    #speed;
    constructor({ position, width, height, speed, fillStyle, strokeStyle } = {}) {
        super({ position, width: width || 60, height: height || 20 });
        this.#speed = speed || 10;
        this.fillStyle = fillStyle || "#00F";
        this.strokeStyle = strokeStyle || "#F0F";
    }

    get speed() { return this.#speed }
    set speed(value) {
        if (value > 0)
            this.#speed = value;
    }

    move(direction, max, min = 0) {
        this.position.x += direction * this.speed;
        if (this.left < min)
            this.left = min;
        else if (this.right > max)
            this.right = max;
    }

    getCollisionPoint(ball) {
        let { x, y } = ball.position;
        if (x < this.left - ball.radius
            || x > this.right + ball.radius)
            return null;
        if (y < this.top - ball.radius)
            return null;

        if (x <= this.left)
            x = this.left
        else if (x >= this.right)
            x = this.right;

        if (y <= this.top)
            y = this.top
        else if (y >= this.bottom)
            y = this.bottom;

        return { x, y };
    }

    getCollisionPointPromise(ball) {
        return new Promise((resolve, reject) => {
            let point = this.getCollisionPoint(ball);
            if (point)
                resolve({ collider: this, ball, point });
            else
                reject(ball);
        });
    }

    onCollision(ball, point) {
        let { x, y } = ball.direction;
        let factor = Math.pow((2 * (point.x - this.position.x) / this.width) - 1, 3);
        x = factor;

        if (point.x + ball.radius >= this.left
            || point.x + ball.radius <= this.right) {
            y = -Math.abs(y);
            ball.position.y = this.top - ball.radius;
        }

        ball.direction = { x, y };
    }

    render(context) {
        context.fillStyle = this.fillStyle;
        context.strokeStyle = this.strokeStyle;
        super.render(context, { fill: true, stroke: true });
    }
}