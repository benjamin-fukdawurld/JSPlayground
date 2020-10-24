import { Ethic, EthicNames, Moral, MoralNames } from "./Constants"

export default class Alignment {
    #alignment;

    constructor(alignment = 0) {
        this.#alignment = alignment;
    }

    get alignment() { return this.#alignment; }
    get alignmentName() {
        if (this.alignment === 0)
            return EthicNames[Ethic.NEUTRAL];

        return [this.ethicName, this.moralName].join(" ");
    }

    get ethic() { return this.#alignment & 3; }
    get ethicName() {
        return EthicNames[this.ethic];
    }

    get moral() { return this.#alignment & 12; }
    get moralName() {
        return MoralNames[this.moral];
    }

}