import Dice from "./Dice"

const RaceIds = {
    HUMAN: 1,
    ELF: 2,
    HALFLING: 4,
    DWARF: 8,
    HALFELF: 16,
    HALFORC: 32,
    DRAGONBORN: 64,
    GNOME: 128,
    TIEFLING: 256
};

const RaceNames = {
    [RaceIds.HUMAN]: "Human",
    [RaceIds.ELF]: "Elf",
    [RaceIds.HALFLING]: "Halfling",
    [RaceIds.DWARF]: "Dwarf",
    [RaceIds.HALFELF]: "Half-Elf",
    [RaceIds.HALFORC]: "Half-Orc",
    [RaceIds.DRAGONBORN]: "Dragonborn",
    [RaceIds.GNOME]: "Gnome",
    [RaceIds.TIEFLING]: "Tiefling"
};

export const ClassIds = {
    BARBARIAN: 1,
    BARD: 2,
    CLERIC: 4,
    DRUID: 8,
    FIGHTER: 16,
    MONK: 32,
    PALADIN: 64,
    RANGER: 128,
    ROGUE: 256,
    SORCERER: 512,
    WARLOCK: 1024,
    WIZARD: 2048
}

export const ClassNames = {
    [ClassIds.BARBARIAN]: "Barbarian",
    [ClassIds.BARD]: "Bard",
    [ClassIds.CLERIC]: "Cleric",
    [ClassIds.DRUID]: "Druid",
    [ClassIds.FIGHTER]: "Fighter",
    [ClassIds.MONK]: "Monk",
    [ClassIds.PALADIN]: "Paladin",
    [ClassIds.RANGER]: "Ranger",
    [ClassIds.ROGUE]: "Rogue",
    [ClassIds.SORCERER]: "Sorcerer",
    [ClassIds.WARLOCK]: "Warlock",
    [ClassIds.WIZARD]: "Wizard"
}

export class Races {
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

export class Classes {
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

export class CharacterAbilities {
    #strength;
    #dexterity;
    #constitution;
    #intelligence;
    #wisdom;
    #charisma

    constructor(args) {
        this.#strength = args["strength"] || CharacterAbilities.getRandomAbilityPoints();
        this.#dexterity = args["dexterity"] || CharacterAbilities.getRandomAbilityPoints();
        this.#constitution = args["constitution"] || CharacterAbilities.getRandomAbilityPoints();
        this.#intelligence = args["intelligence"] || CharacterAbilities.getRandomAbilityPoints();
        this.#wisdom = args["wisdom"] || CharacterAbilities.getRandomAbilityPoints();
        this.#charisma = args["charisma"] || CharacterAbilities.getRandomAbilityPoints();
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


export class Character {
    #name
    #races;
    #classes;
    #level;
    #abilities
    #healthPoints;
    #maxHealthPoints;

    constructor({
        name,
        races = Races.ids.HUMAN,
        classes = Classes.ids.FIGHTER,
        level = 1,
        healthPoints = 1,
        maxHealthPoints = 1,
        abilities = new CharacterAbilities({})
    }) {
        this.#name = name;
        this.#abilities = abilities;
        this.#races = races;
        this.#classes = classes;
        this.#level = level;
        this.#healthPoints = healthPoints;
        this.#maxHealthPoints = maxHealthPoints;
    }

    get name() { return this.#name; }

    get abilities() { return this.#abilities; }

    get level() { return this.#level; }

    get races() { return this.#races; }
    get raceNames() { return Races.getName(this.races).join(" "); }
    get isMultiRace() { return Races.isMultiRace(this.races); }

    get classes() { return this.#classes; }
    get classeNames() { return Classes.getName(this.classes).join(" "); }
    get isMultiClass() { return Classes.isMultiClass(this.classes); }
    matchClass(ClassId) { return (this.classes & ClassId) !== 0; }

    get healthPoints() { return this.#healthPoints; }
    get maxHealthPoints() { return this.#maxHealthPoints; }
}
