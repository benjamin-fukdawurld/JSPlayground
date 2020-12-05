import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={() => {
                    if (!this.props.value)
                        this.props.onClick();
                }}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square onClick={() => {
            if (this.props.isDone)
                return;

            let board = [...this.props.board];
            board[i] = this.props.current;
            this.props.onChange(board);
        }}
            value={this.props.board[i]} />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        let state = {
            board: new Array(9),
            current: 'X',
            done: false
        };

        let history = [JSON.stringify(state)];
        this.state = {
            ...state,
            history
        };
    }

    isDone(board) {
        for (let i = 0; i < 3; ++i) {
            let row = i * 3;
            if (board[row] && board[row] === board[row + 1]
                && board[row] === board[row + 2])
                return true;

            let col = 3 + i
            if (board[col] && board[col] === board[col + 3]
                && board[col] === board[col + 6])
                return true;
        }

        return (board[0]
            && board[0] === board[4]
            && board[0] === board[8])
            || (board[2]
                && board[2] === board[4]
                && board[2] === board[6]);
    }

    render() {
        const status = `${this.isDone(this.state.board) ? "Winner" : "Next player"}: ${this.state.current}`;
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        board={this.state.board}
                        current={this.state.current}
                        isDone={this.state.done}
                        onChange={(board) => {
                            let current = this.state.current;
                            let done = this.isDone(board);
                            if (!done)
                                current = (this.state.current === 'X' ? 'O' : 'X');
                            const history = [
                                ...this.state.history,
                                JSON.stringify({ board, current })
                            ];
                            this.setState({ board, history, current, done });
                        }}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{
                        this.state.history.map((state, index) => {
                            return <li
                                key={state}
                                onClick={() => {
                                    this.setState({
                                        ...JSON.parse(state),
                                        history: this.state.history.slice(0, index + 1)
                                    })
                                }}
                            >
                                {`return to state #${index}`}
                            </li>
                        })
                    }</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);