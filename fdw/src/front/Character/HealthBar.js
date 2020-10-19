import React, { Component } from 'react';

import "./HealthBar.css"

class HealthBar extends Component {
    constructor({ hp, maxHp }) {
        super();
        this.hp = hp;
        this.maxHp = maxHp;
    }

    render() {
        return <div className="character-health-bar">
            {this.hp} / {this.maxHp}
        </div>
    }
}

export default HealthBar;