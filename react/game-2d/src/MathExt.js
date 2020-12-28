export default class MathExt {
    static clamp(x, low, high) {
        return (x < low ? low : (x > high ? high : x));
    }

    static vectorLength(v) {
        return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
    }

    static vectorNormalized(v) {
        const len = MathExt.vectorLength(v);
        return { x: v.x / len, y: v.y / len };
    }

    static resizeVector(v, size) {
        let result = MathExt.vectorNormalized(v);
        result.x *= size;
        result.y *= size;
        return result;
    }

    static getVec2Determinant(v1, v2) {
        return (v1.x * v2.y) - (v1.y * v2.x);
    }

    static getIntersectionFactors(line1, line2) {
        const v1 = { x: line1.end.x - line1.start.x, y: line1.end.y - line1.start.y };
        const v2 = { x: line2.end.x - line2.start.x, y: line2.end.y - line2.start.y };
        const det = MathExt.getVec2Determinant(v1, v2);
        if (det === 0)
            return null;

        const v3 = { x: line1.start.x - line2.start.x, y: line1.start.y - line2.start.y };
        return [
            ((v2.x * v3.x) - (v2.y * v3.y)) / det,
            ((v1.x * v3.x) - (v1.y * v3.y)) / det
        ];
    }

    static getIntersectionPoint(line1, line2, factors) {
        if (!factors)
            factors = MathExt.getIntersectionFactors(line1, line2);

        return {
            x: line1.start.x + (factors[0] * (line1.end.x - line1.start.x)),
            y: line1.start.y + (factors[0] * (line1.end.y - line1.start.y))
        };
    }
}