import MathExt from '../../MathExt';

export default class Ball {
    #position;
    #direction;
    #radius;
    #fillStyle;
    #strokeStyle;
    #speedLimit;
    constructor({ position, direction, radius, speedLimit, fillstyle, strokeStyle } = {}) {
        this.#position = position || { x: 0, y: 0 };
        this.#direction = direction || { x: 0, y: 0 };
        this.#radius = radius || 10;
        this.#speedLimit = speedLimit || 5;
        this.#fillStyle = fillstyle || '#0F0';
        this.#strokeStyle = strokeStyle || '#000';
    }

    get radius() {
        return this.#radius;
    }

    set radius(value) {
        if (value > 0)
            this.#radius = value;
    }

    get position() {
        return this.#position;
    }

    set position(pos) {
        if (typeof pos.x === "number" && pos.x >= 0)
            this.#position.x = pos.x;
        if (typeof pos.y === "number" && pos.y >= 0)
            this.#position.y = pos.y;
    }

    get direction() {
        return this.#direction;
    }

    set direction(dir) {
        if (typeof dir.x === "number") {
            this.#direction.x = dir.x;
        }
        if (typeof dir.y === "number") {
            this.#direction.y = Math.sign(dir.y) * Math.max(Math.abs(dir.y), 1);
        }

        this.#direction = MathExt.vectorNormalized(this.#direction);
    }

    update(container, slider, bricks) {
        let { x, y } = this.#position;
        this.#position.x += this.direction.x * this.#speedLimit;
        this.#position.y += this.direction.y * this.#speedLimit;

        Promise.allSettled([
            slider.getCollisionPointPromise(this),
            container.getCollisionPointPromise(this),
            ...bricks.map((brick) => brick.getCollisionPointPromise(this))
        ])
            .then((results) => {
                for (let current of results.filter(r => r.status !== 'rejected')) {
                    const { collider, ball, point } = current.value;
                    ball.position = { x, y };
                    collider.onCollision(ball, point);
                }
            })
            .catch(() => { });
    }

    render(context) {
        context.beginPath();
        context.arc(this.position.x, this.position.y,
            this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.#fillStyle;
        context.fill();
        context.strokeStyle = this.#strokeStyle;
        context.stroke();
        context.closePath();
    }
}