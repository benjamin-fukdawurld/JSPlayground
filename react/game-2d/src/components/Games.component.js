import React, { Component, createRef } from 'react';

import Box from '@material-ui/core/Box'
import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio }
    from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

export default class Games extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = createRef(null);
        this.state = {
            gameIndex: this.props.gameIndex
        }
    }

    get game() {
        return this.state.gameIndex < 0
            ? null
            : this.props.games[this.state.gameIndex];
    }

    render() {
        return <Box>
            <Typography variant="h2">
                Select a game
        </Typography>
            <Grid container>
                <Grid item xs={3}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            Game List
                    </FormLabel>
                        <RadioGroup
                            aria-label="games"
                            name="games"
                            value={this.game?.name || ""}
                            onChange={(event, gameName) => {
                                let i = 0;
                                let len = this.props.games.length;
                                while (i < len && this.props.games[i].name !== gameName)
                                    ++i;

                                const game = this.props.games[i];
                                game.canvas = this.canvasRef.current;
                                this.setState({ gameIndex: i });
                                this.props.onGameChange(game, i);
                            }}
                        >
                            {this.props.games.map((game, index) => {
                                return <FormControlLabel
                                    key={index}
                                    control={<Radio />}
                                    value={game.name}
                                    label={game.name}
                                />;
                            })}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={9}>
                    <Box>
                        <canvas ref={this.canvasRef} width="640" height="480"
                            tabIndex="0"
                            onClick={(event) => {
                                const game = this.game;
                                if (game && game.handleClick)
                                    game.handleClick(event);
                            }}
                            onKeyDown={(event) => {
                                const game = this.game;
                                if (game && game.handleKeyDown)
                                    game.handleKeyDown(event);
                            }}
                            onKeyPress={(event) => {
                                const game = this.game;
                                if (game && game.handleKeyPress)
                                    game.handleKeyPress(event);
                            }}
                            onKeyUp={(event) => {
                                const game = this.game;
                                if (game && game.handleKeyUp)
                                    game.handleKeyUp(event);
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>;
    }
}