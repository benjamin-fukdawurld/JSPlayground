export default class Core {
    static random(minValue, maxValue) {
        return minValue + Math.floor(Math.random() * Math.floor(maxValue - minValue));
    }
}