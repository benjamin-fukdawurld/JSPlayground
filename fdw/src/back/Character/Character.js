import Races from "./Races"
import Classes from "./Classes"
import Abilities from "./Abilities"

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
        abilities = new Abilities({})
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
