import React, { Component } from 'react'
import './App.css'

import { Character } from './back/Character';
import CharacterComponents from './front/Character/Character';
import Dice from './front/Common/Dice';

import Card from "./Card";
import GuessCount from './GuessCount';

class App extends Component {
  render() {
    let car = [
      new Character({
        name: "Ben The Slayer"
      }),
      new Character({
        name: "Kelly The Tiger"
      })];
    return (
      <div className="App">
        <Dice.DiceDataList />
        <Dice />
        {car.map(c => (
          <CharacterComponents key={c.name} character={c} />
        ))}
      </div>
    )
  }
}

export default App