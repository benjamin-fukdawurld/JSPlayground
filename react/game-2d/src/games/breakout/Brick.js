import Rect from '../Rect';

export default class Brick extends Rect {
    #life;
    constructor({ position, width, height, life, fillStyle, strokeStyle }) {
        super({ position, width, height });
        this.#life = life || 1;
        this.fillStyle = fillStyle || "#F00";
        this.strokeStyle = strokeStyle || "#000";
    }

    get life() { return this.#life; }
    get isAlive() { return this.#life > 0; }

    getCollisionPoint(ball) {
        let { x, y } = ball.position;
        if (x < this.left - ball.radius
            || x > this.right + ball.radius)
            return null;
        if (y < this.top - ball.radius
            || y > this.bottom + ball.radius)
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
        if (point.x <= this.left || point.x >= this.right)
            x *= -1;
        else if (point.y <= this.top || point.y >= this.bottom)
            y *= -1;

        --(this.#life);
        ball.direction = { x, y };
    }

    render(context) {
        context.fillStyle = this.fillStyle;
        context.strokeStyle = this.strokeStyle;
        super.render(context, { fill: true, stroke: true });
    }
}