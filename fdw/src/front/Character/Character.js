import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CharacterAbilities from "./Abilities"
import HealthBar from "./HealthBar"

import avatar from './avatar.jpg';
import './Character.css'

export default class Character extends Component {
    constructor({ character, desc }) {
        super();
        this.avatar = avatar
        this.character = character;
        this.desc = desc;
    }

    shortDesc = () => (<div className="character-short-desc">
        <div className="character-races">{this.character.raceNames}</div>
        <div className="character-level">{this.character.level}</div>
        <div className="character-classes">{this.character.classeNames}</div>
    </div>);

    longDesc = () => <div className="character-long-desc">
        <CharacterAbilities abilities={this.character.abilities} />
    </div>

    render() {
        return <div className="character">
            <div className="character-presentation">
                <div className="character-avatar">
                    <img className="character-avatar" src={this.avatar} alt="charater avatar" />
                </div>
                <div className="character-name">{this.character.name}</div>
                <HealthBar hp={this.character.healthPoints} maxHp={this.character.maxHealthPoints} />
            </div>
            {this.desc !== "presentation" && this.shortDesc()}
            {this.desc === "long" && this.longDesc()}
        </div>;
    }
}

Character.defaultProps = {
    desc: "presentation"
}

Character.propTypes = {
    short: PropTypes.oneOf([
        "presentation",
        "short",
        "long"
    ])
}