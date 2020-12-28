import React, { Component } from 'react';
import Box from '@material-ui/core/Box'

import AppBar from './components/AppBar.component';
import Home from './components/Home.component';
import Games from './components/Games.component';

import GameList from './games/Games';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
            gameIndex: -1
        };

        this.tabs = [
            {
                label: "Home",
                node: < Home />
            },
            {
                label: "Games",
                node: <Games
                    gameIndex={this.state.gameIndex}
                    games={GameList}
                    onGameChange={(game, index) => {
                        if (this.state.gameIndex === index)
                            return;
                        if (this.state.gameIndex >= 0)
                            GameList[this.state.gameIndex].stop();

                        this.setState({ gameIndex: index }, () => {
                            game.start()
                        });
                    }}
                />
            }
        ];

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(event, tab) {
        this.setState({ currentTab: tab });
    }

    render() {
        return <Box>
            <AppBar
                currentTab={this.state.currentTab}
                onTabChange={this.handleTabChange}
                tabs={this.tabs}
            />
        </Box>;
    }
}

export default App;
