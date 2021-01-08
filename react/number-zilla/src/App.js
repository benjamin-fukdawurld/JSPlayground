import React, { Component } from 'react';

import { Container, Typography } from '@material-ui/core';

import UserContext from './components/UserContext.component';
import NumberTable from './components/NumberTable.component';
import Buttons from './components/Buttons.component';

import { TableWrapper, SelectionHandler } from './game/Game';
import Environment from './game/ai/Environment';



export default class App extends Component {
    constructor(props) {
        super(props);
        let table = new TableWrapper({
            numbers: [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 1, 1, 2, 1, 3, 1, 4, 1],
                [5, 1, 6, 1, 7, 1, 8, 1, 9]
            ]
        });

        this.state = {
            numbers: table.numbers,
            playables: table.playables,
            helpIndex: -1,
            selected: [],
            history: []
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHelp = this.handleHelp.bind(this);

        let env = new Environment(false);
        env.render();
        env.step(env.action_space[1]);
        env.render();
    }

    get table() {
        return new TableWrapper({ numbers: this.state.numbers });
    }

    get playable() {
        return this.state.helpIndex < 0
            ? null
            : this.state.playables[this.state.helpIndex]
    }

    get nextPlayableIndex() {
        let playableLength = this.state.playables.length;
        return (playableLength <= 0 ? -1 : (this.state.helpIndex + 1) % playableLength);
    }

    updateTable() {
        let numbers = this.table.updated();
        this.setState({ numbers, helpIndex: -1 }, () => {
            this.setState({
                playables: this.table.playables
            })
        });
    }

    handleClick({ x, y }) {
        let handler = new SelectionHandler(this.state.selected);
        handler.update({ x, y });
        let numbers = handler.check(JSON.parse(JSON.stringify(this.state.numbers)));
        let newState = {
            selected: handler.selection,
        }
        if (numbers) {
            let table = new TableWrapper({ numbers });
            table.update();
            Object.assign(newState,
                {
                    numbers: table.numbers,
                    helpIndex: -1,
                    history: this.state.history.concat(JSON.stringify(this.state.numbers))
                });
        }

        this.setState(newState, () => {
            this.setState({
                playables: this.table.playables
            })
        });
    }

    handleUndo() {
        const last = this.state.history.length - 1;
        let numbers = JSON.parse(this.state.history[last]);
        let history = this.state.history.slice(0, last);

        this.setState({ numbers, helpIndex: -1, history, selected: [] }, () => {
            this.setState({
                playables: this.table.playables
            })
        });
    }

    handleRestart() {
        let numbers = JSON.parse(this.state.history[0]);
        let history = [];

        this.setState({ numbers, helpIndex: -1, history, selected: [] }, () => {
            this.setState({
                playables: this.table.playables
            })
        });
    }

    handleAdd() {
        this.table.getConcatPromise().then((numbers) => {
            this.setState({
                numbers,
                helpIndex: -1,
                history: this.state.history.concat(JSON.stringify(this.state.numbers)),
                selected: []
            }, () => {
                this.table.getPlayablePromise().then((playables) => {
                    this.setState({
                        playables
                    });
                })
            })
        });
    }

    handleHelp() {
        let playableLength = this.state.playables.length;
        let helpIndex = (playableLength <= 0 ? -1 : (this.state.helpIndex + 1) % playableLength);
        this.setState({
            selected: [],
            helpIndex
        });
    }

    render() {
        return <UserContext.Provider value={{ name: "ben", age: 27 }}>
            <Container component="main" maxWidth="xs">
                <Container>
                    <Typography variant="h4">
                        Numb3r2illa
                    </Typography>
                </Container>
                <NumberTable
                    highlighted={this.playable}
                    selected={this.state.selected}
                    numbers={this.state.numbers}
                    onClick={this.handleClick}
                />
                <Buttons
                    numbers={this.state.numbers}
                    history={this.state.history}
                    playables={this.state.playables}
                    onHelp={this.handleHelp}
                    onUndo={this.handleUndo}
                    onAdd={this.handleAdd}
                    onRestart={this.handleRestart}
                />
            </Container>
        </UserContext.Provider>;
    }
}
