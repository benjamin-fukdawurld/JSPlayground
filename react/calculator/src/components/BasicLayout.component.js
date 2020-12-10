import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
    width: 94%;
    margin: 0px 10px 10px 10px;
    border-collapse: separate;
    border-spacing: 0px 1px;
    background-color: #3E3E3E;
`;

const TBody = styled.tbody`
    width: 100%;
    background-color: #3E3E3E;
`;

const ButtonRow = styled.tr`
    width: 100%;
`;

const Button = styled.button`
    width: 100%;
    height: 97%;
    border-radius: 5px;
    border-style: solid;
    border-color: #202020;
    border-width: 1px;
    background-color: #505050;
    color: white;
    &:focus {
        outline-style: none;
    }
`;

const ButtonCell = styled.td`
    padding-left: 2px;
    padding-right: 2px;
    width: 35px;
    height: 35px;
`;

export default function BasicLayout(props) {
    const createButton = ({ label, value, cellProps, buttonProps }) => {
        if (!value)
            value = label;

        const obj = {
            ...buttonProps,
            className: [buttonProps?.className || "", "calculatorButton"].join(" "),
            onClick: () => {
                props.onClick(value)
            }
        }
        return <ButtonCell {...cellProps}>
            <Button
                {...obj}
            >
                {label}
            </Button>
        </ButtonCell>
    }

    return <Table>
        <TBody>
            <ButtonRow>
                {createButton({ label: '7' })}
                {createButton({ label: '8' })}
                {createButton({ label: '9' })}
                {createButton({ label: '', value: '/' })}
                {createButton({ label: '⎌', value: 'undo' })}
                {createButton({ label: 'C' })}
            </ButtonRow>
            <ButtonRow>
                {createButton({ label: '4' })}
                {createButton({ label: '5' })}
                {createButton({ label: '6' })}
                {createButton({ label: '×', value: '*' })}
                {createButton({ label: '(' })}
                {createButton({ label: ')' })}
            </ButtonRow>
            <ButtonRow>
                {createButton({ label: '1' })}
                {createButton({ label: '2' })}
                {createButton({ label: '3' })}
                {createButton({ label: '-' })}
                {createButton({ label: 'x²', value: '^2' })}
                {createButton({ label: '√', value: 'sqrt' })}
            </ButtonRow>
            <ButtonRow>
                {createButton({ label: '0' })}
                {createButton({ label: ',', value: '.' })}
                {createButton({ label: '%' })}
                {createButton({ label: '+' })}
                {createButton({
                    label: '=',
                    value: '=',
                    cellProps: { colSpan: '2' },
                })}
            </ButtonRow>
        </TBody>
    </Table>;
}