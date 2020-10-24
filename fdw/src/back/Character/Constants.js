export const RaceIds = {
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

export const RaceNames = {
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

export const Ethic =
{
    NEUTRAL: 0,
    LAWFUL: 1,
    CHAOTIC: 2
}

export const EthicNames =
{
    [Ethic.NEUTRAL]: "Neutral",
    [Ethic.LAWFUL]: "Lawful",
    [Ethic.CHAOTIC]: "Chaotic"
}

export const Moral =
{
    NEUTRAL: 0,
    GOOD: 4,
    EVIL: 8
}

export const MoralNames =
{
    [Ethic.NEUTRAL]: "Neutral",
    [Ethic.Good]: "Good",
    [Ethic.Evil]: "Evil"
}