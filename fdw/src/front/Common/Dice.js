import React, { Component } from 'react'
import DiceModel from "../../back/Common/Dice"
//import './Dice.css'

export default class Dice extends Component {
    constructor(props) {
        super(props)
        this.numberOfDices = 1;
        this.bonus = 0;
        this.diceSize = 0;
        this.state = {
            diceResult: null
        }

        this.onNumberChanges = this.onNumberChanges.bind(this);
        this.onSizeChanges = this.onSizeChanges.bind(this);
        this.onBonusChanges = this.onBonusChanges.bind(this);
        this.onRollDice = this.onRollDice.bind(this);
    }

    get diceResult() { return this.state.diceResult; }

    static DiceDataList() {
        return <datalist id="standard-dices">
            <option value="4" />
            <option value="6" />
            <option value="8" />
            <option value="10" />
            <option value="20" />
            <option value="100" />
        </datalist>;
    }

    NumberOfDiceLabel() {
        return <label>Number of Dices</label>;
    }

    NumberOfDiceSpinBox() {
        return <input type="number" name="number-of-dice" min="1" defaultValue={this.numberOfDices}
            onInput={this.onNumberChanges} />;
    }

    TypeOfDiceLabel() {
        return <label>Type of Dices</label>;
    }

    TypeOfDiceSpinBox() {
        return <input type="number" min="4" name="type-of-dice"
            list="standard-dices" onInput={this.onSizeChanges} />;
    }

    BonusLabel() {
        return <label>Bonus</label>;
    }

    BonusSpinBox() {
        return <input type="number" defaultValue={this.bonus} name="dice-bonus"
            onInput={this.onBonusChanges} />;
    }

    RollDiceButton() {
        return <input type="button" value="roll dice" name="roll-dice-button"
            onClick={this.onRollDice} />;
    }

    onNumberChanges(event) {
        this.numberOfDices = event.target.value; this.setState({
            diceResult: null
        })
    }
    onSizeChanges(event) { this.diceSize = event.target.value; }
    onBonusChanges(event) { this.bonus = event.target.value; }
    onRollDice() {
        if (this.diceSize === undefined)
            return;

        this.setState((state, prop) => ({
            diceResult: DiceModel.diceRollFromPattern(
                this.numberOfDices.toString()
                + "D"
                + this.diceSize.toString()
                + "+"
                + this.bonus.toString()
            )
        }));
    }

    render() {
        return <div className="dice-roller">
            <table>
                <thead>
                    <tr>
                        <th colSpan="3">Dice Roll</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.NumberOfDiceLabel()}</td><td>:</td><td>{this.NumberOfDiceSpinBox()}</td>
                    </tr>
                    <tr>
                        <td>{this.TypeOfDiceLabel()}</td><td>:</td><td>{this.TypeOfDiceSpinBox()}</td>
                    </tr>
                    <tr>
                        <td>{this.BonusLabel()}</td><td>:</td><td>{this.BonusSpinBox()}</td>
                    </tr>
                    <tr>
                        <td colSpan="2">{this.RollDiceButton()}</td>
                        <td>{this.diceResult}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
}