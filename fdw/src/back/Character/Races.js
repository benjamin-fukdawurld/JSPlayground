import { RaceIds, RaceNames } from "./Constants"

export default class Races {
    static get ids() { return RaceIds; }
    static get names() { return RaceNames; }
    static getName(flag) {
        let result = []
        for (let i = 1; i <= flag; i *= 2) {
            if ((flag & i) !== 0)
                result.push(this.names[i]);
        }

        return result;
    }

    static isMultiRace(flag) {
        if (flag === 0)
            return false;

        let found = false;
        for (let i = 1; i <= flag; i *= 2) {
            if ((flag & i) !== 0) {
                if (found)
                    return true;

                found = true;
            }
        }

        return false;
    }
}
