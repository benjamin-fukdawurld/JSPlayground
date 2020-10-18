import Core from "./Core"

export default class Dice {
    static diceRoll(diceSizes, bonus = 0, multiplicator = value => value) {
        if (!Array.isArray(diceSizes))
            throw new TypeError("'diceSizes' must be an array of int");

        if (typeof (bonus) !== "number")
            throw new TypeError("'bonus' must be an integer");

        if (typeof (multiplicator) !== "function")
            throw new TypeError("'multiplicator' must be a function");


        let result = 0;
        for (let i = 0, imax = diceSizes.length; i < imax; ++i) {
            let diceResult = Core.random(1, diceSizes[i] + 1);
            result += Math.floor(multiplicator(diceResult));
        }

        return result + bonus;
    }

    static diceRollFromPattern(pattern, multiplicator = value => multiplicator) {
        if (pattern !== "string")
            throw new TypeError("'pattern' must be a function");
        pattern = pattern.toUpperCase();
        let sizePos = pattern.indexOf("D");
        let bonusPos = pattern.indexOf("+");
        if (bonusPos === -1)
            bonusPos = pattern.indexOf("-");
        let number = parseInt(pattern.substring(0, sizePos), 10)
        let diceSize = parseInt(pattern.substring(sizePos + 1, bonusPos), 10)
        let bonus = parseInt(pattern.substring(sizePos + 1, bonusPos), 10)

        return Dice.diceRoll(Array(number).fill(diceSize), bonus, multiplicator)
    }
}