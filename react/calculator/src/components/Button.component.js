import React from 'react';
import styled from 'styled-components';

const ButtonCell = styled.td`
    padding-left: 2px;
    padding-right: 2px;
    width: 35px;
    height: 35px;
`;

const ButtonTag = styled.button`
    width: 100%;
    height: 97%;
    border-radius: 5px;
    border-style: solid;
    border-color: #202020;
    border-width: 1px;
    background-color: ${props => props.color || "#505050"};
    font-style: ${props => props.fontStyle || "normal"};
    color: white;
    &:focus {
        outline-style: none;
    }
    &:hover {
        background-color: ${props => props.hoverColor || "#606060"};
    }
    &:active {
        background-color: ${props => props.activeColor || "#404040"};
    }
`;

export default function Button(props) {
    let { label, value, cellProps, buttonProps } = props;
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
        <ButtonTag
            {...obj}
        >
            {label}
        </ButtonTag>
    </ButtonCell>;
}