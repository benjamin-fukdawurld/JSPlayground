import React, { Component, createRef } from 'react';

import BasicLayout from './BasicLayout.component';
import History from './History.component';
import OperationField from './OperationField.component';

import { evaluate } from 'mathjs';

import styled from 'styled-components';

const MainContainer = styled.div`
    width: 100%;
    max-width: 346px;
    margin-left: 5px;
    margin-top: 5px;
    border-style: solid;
    border-width: 1px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #3E3E3E;
`;

const Header = styled.div`
    height: 46px;
    background-color: #303030;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const CalculatorInputContainer = styled.div`
    background-color: #3E3E3E;
`;

export default class Calculator extends Component {
    constructor(props) {
        super(props)
        this.operationRef = createRef(null)
        this.state = {
            history: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleEqual() {
        try {
            let result = evaluate(this.operationRef.current.value);
            const history = this.state.history.concat(
                [{
                    operation: this.operationRef.current.value,
                    result
                }]);
            this.setState({ history }, () => (this.operationRef.current.value = ""));
        } catch (e) {
            console.log(e.message);
        }
    }

    handleUndo() {
        if (this.state.history.length === 0)
            return;

        this.operationRef.current.value =
            this.state.history[this.state.history.length - 1].operation;
    }

    handleClear() {
        this.operationRef.current.value = '';
    }

    handleClick(value) {
        switch (value) {
            case 'C':
                this.handleClear();
                break;

            case 'undo':
                this.handleUndo();
                break;

            case '=':
                this.handleEqual();
                break;

            default:
                this.operationRef.current.value += value;
                break;
        }
    }

    render() {
        return <MainContainer className="calculator">
            <Header className="header"></Header>
            <History
                history={this.state.history}
                onClick={(operation) => this.operationRef.current.value = operation}
            />
            <CalculatorInputContainer className="calculatorForm">
                <OperationField
                    ref={this.operationRef}
                    onKeyUp={(event) => {
                        if (event.key !== 'Enter')
                            return;

                        this.handleEqual();
                    }}
                />
                <BasicLayout
                    onClick={this.handleClick}
                />
            </CalculatorInputContainer>
        </MainContainer>
    }
}