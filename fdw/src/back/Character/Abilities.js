import Dice from "../Common/Dice"

export default class Abilities {
    #strength;
    #dexterity;
    #constitution;
    #intelligence;
    #wisdom;
    #charisma

    constructor(args) {
        this.#strength = args["strength"] || Abilities.getRandomAbilityPoints();
        this.#dexterity = args["dexterity"] || Abilities.getRandomAbilityPoints();
        this.#constitution = args["constitution"] || Abilities.getRandomAbilityPoints();
        this.#intelligence = args["intelligence"] || Abilities.getRandomAbilityPoints();
        this.#wisdom = args["wisdom"] || Abilities.getRandomAbilityPoints();
        this.#charisma = args["charisma"] || Abilities.getRandomAbilityPoints();
    }

    static getRandomAbilityPoints() {
        return Dice.diceRoll([6, 6]) + Math.max(Dice.diceRoll([6]), Dice.diceRoll([6]));
    }

    get strength() { return this.#strength; }
    get strengthModificator() { return Math.floor((this.#strength - 10) / 2); }

    get dexterity() { return this.#dexterity; }
    get dexterityModificator() { return Math.floor((this.#dexterity - 10) / 2); }

    get constitution() { return this.#constitution; }
    get constitutionModificator() { return Math.floor((this.#constitution - 10) / 2); }

    get intelligence() { return this.#intelligence; }
    get intelligenceModificator() { return Math.floor((this.#intelligence - 10) / 2); }

    get wisdom() { return this.#wisdom; }
    get wisdomModificator() { return Math.floor((this.#wisdom - 10) / 2); }

    get charisma() { return this.#charisma; }
    get charismaModificator() { return Math.floor((this.#charisma - 10) / 2); }
}