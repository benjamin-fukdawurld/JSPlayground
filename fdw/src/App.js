import React, { Component } from 'react'
import './App.css'

import { Character } from './back/Character/Character';
import CharacterComponents from './front/Character/Character';
import Dice from './front/Common/Dice';

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