import Brick from './Brick';

const levelGenerators = [
    function (width, height) {
        let result = [
            new Brick({ position: { x: 1 * width, y: 5 * height }, width, height, life: 1 }),
            new Brick({ position: { x: 2 * width, y: 4 * height }, width, height, life: 1 }),
            new Brick({ position: { x: 2 * width, y: 5 * height }, width, height, life: 1 }),
            new Brick({ position: { x: 2 * width, y: 6 * height }, width, height, life: 1 }),
            new Brick({ position: { x: 9 * width, y: 4 * height }, width, height, life: 1 }),
            new Brick({ position: { x: 9 * width, y: 5 * height }, width, height, life: 1 }),
            new Brick({ position: { x: 9 * width, y: 6 * height }, width, height, life: 1 }),
            new Brick({ position: { x: 10 * width, y: 5 * height }, width, height, life: 1 })
        ]
        for (let i = 3; i < 9; ++i) {
            for (let j = 3; j <= 7; ++j) {
                result.push(new Brick({ position: { x: i * width, y: j * height }, width, height, life: 1 }))
            }
        }

        return result;
    }
];

export default levelGenerators;