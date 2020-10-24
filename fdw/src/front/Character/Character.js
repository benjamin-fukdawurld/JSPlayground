import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CharacterAbilities from "./Abilities"
import HealthBar from "./HealthBar"

import avatar from './avatar.jpg';
import './Character.css'

export default class Character extends Component {
    constructor(props) {
        super(props);
        this.avatarImage = avatar
        this.character = props.character;
        this.desc = props.desc;
    }

    avatar = () => (<div className="character-avatar">
        <img className="character-avatar" src={this.avatarImage} alt="charater avatar" />
    </div>)

    presentation = () => (<div className="character-presentation">
        <div className="character-name">{this.character.name}</div>
        <HealthBar hp={this.character.healthPoints} maxHp={this.character.maxHealthPoints} />
    </div>)

    shortDesc = () => (<div className="character-short-desc">
        <div className="character-races">{this.character.raceNames}</div>
        <div className="character-level">{this.character.level}</div>
        <div className="character-classes">{this.character.classeNames}</div>
    </div>);

    longDesc = () => (<div className="character-long-desc">
        <CharacterAbilities abilities={this.character.abilities} />
    </div>)

    render() {
        return <div className="character">
            {this.avatar()}
            {this.desc !== "avatar" && this.presentation()}
            {this.desc !== "avatar" && this.desc !== "presentation" && this.shortDesc()}
            {this.desc !== "avatar"
                && this.desc !== "presentation"
                && this.desc === "long" && this.longDesc()}
        </div>;
    }
}

Character.defaultProps = {
    desc: "avatar"
}

Character.propTypes = {
    short: PropTypes.oneOf([
        "avatar",
        "presentation",
        "short",
        "long"
    ])
}