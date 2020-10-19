import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class CharacterAbilities extends Component {
    static propTypes = {
        abilities: PropTypes.objectOf(
            PropTypes.shape({
                strength: PropTypes.number.isRequired,
                dexterity: PropTypes.number.isRequired,
                constitution: PropTypes.number.isRequired,
                intelligence: PropTypes.number.isRequired,
                wisdom: PropTypes.number.isRequired,
                charisma: PropTypes.number.isRequired
            })
        ).isRequired
    }

    constructor({ abilities }) {
        super();
        this.abilities = abilities;
    }

    static AbilityName({ name }) {
        return <div className="character-ability-name">{name}</div>;
    }
    static AbilityValue({ value }) {
        return <div className="character-ability-value">{value}</div>;
    }

    static Ability({ name, value }) {
        return <div className="character-ability">
            <CharacterAbilities.AbilityName name={name} />
            <CharacterAbilities.AbilityValue value={value} />
        </div>;
    }

    render() {
        return <div className="character-abilities">
            <CharacterAbilities.Ability name="Strength" value={this.abilities.strength} />
            <CharacterAbilities.Ability name="Dexterity" value={this.abilities.dexterity} />
            <CharacterAbilities.Ability name="Constitution" value={this.abilities.constitution} />
            <CharacterAbilities.Ability name="Intelligence" value={this.abilities.intelligence} />
            <CharacterAbilities.Ability name="Wisdom" value={this.abilities.wisdom} />
            <CharacterAbilities.Ability name="Charisma" value={this.abilities.charisma} />
        </div>;
    }
}

CharacterAbilities.AbilityName.propTypes = {
    name: PropTypes.string.isRequired
}

CharacterAbilities.AbilityValue.propTypes = {
    value: PropTypes.number.isRequired
}

CharacterAbilities.Ability.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}
