import { ClassIds, ClassNames } from "./Constants"

export default class Classes {
    static get ids() { return ClassIds; }
    static get names() { return ClassNames; }
    static getName(flag) {
        let result = []
        for (let i = 1; i <= flag; i *= 2) {
            if ((flag & i) !== 0)
                result.push(this.names[i]);
        }

        return result;
    }

    static isMultiClass(flag) {
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