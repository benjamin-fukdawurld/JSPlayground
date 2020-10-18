import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Character } from './Character'

function AbilityNameComponent({ name }) {
  return <td className="character-ability-name">{name}</td>;
}

function AbilityValueComponent({ value }) {
  return <td className="character-ability-value">{value}</td>;
}

function AbilityComponent({ name, value }) {
  return <tr className="character-ability">
    <AbilityNameComponent name={name} />
    <AbilityValueComponent value={value} />
  </tr>;
}

function AbilitiesComponent({ abilities }) {
  return <table className="character-abilities">
    <thead>
      <tr><td colSpan="2">Abilities</td></tr>
    </thead>
    <tbody>
      <AbilityComponent name="Strength" value={abilities.strength} />
      <AbilityComponent name="Dexterity" value={abilities.dexterity} />
      <AbilityComponent name="Constitution" value={abilities.constitution} />
      <AbilityComponent name="Intelligence" value={abilities.intelligence} />
      <AbilityComponent name="Wisdom" value={abilities.wisdom} />
      <AbilityComponent name="Charisma" value={abilities.charisma} />
    </tbody>
  </table>;
}

function CharacterComponent({ character }) {
  return <div className="character">
    <table>
      <tr>
        <td>
          <img className="character-avatar" src={logo} alt="charater avatar" />
          <div className="character-name">{character.name}</div>
          <table>
            <tr>
              <td className="character-races">{character.raceNames}</td>
              <td className="character-level" rowSpan="2">{character.level}</td>
            </tr>
            <tr>
              <td className="character-classes">{character.classeNames}</td>
            </tr>
          </table>
          <div className="character-healthpoints">{character.maxHealthPoints} / {character.healthPoints}</div>
        </td>
        <AbilitiesComponent abilities={character.abilities} />
      </tr>
    </table>
  </div>
}

function App() {
  var car = new Character({
    name: "Ben The Slayer"
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CharacterComponent character={car} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
