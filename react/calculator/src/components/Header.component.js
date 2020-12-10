import React from 'react';

import styled from 'styled-components';

const HeaderContainer = styled.div`
    height: 46px;
    background-color: #303030;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const Select = styled.select`
    margin-top: 5px;
    margin-left: 30px;
    padding: 7px 25px 7px 10px;
    font-weight: bold;
    background-color: #303030;
    font-size: 1.05em;
    color: white;
    border-radius: 4px;
    border-color: #303030;
    background: url(down_arrow.svg) no-repeat;
    background-position: calc(100% - 5px);
    background-size: 10%;
    &:focus {
        outline-style: none;
    }
    &:hover {
        background-color: #454545;
    }
    &:active {
        background-color: #202020;
        border-color: black;
    }
`;

export default function Header(props) {
    return <HeaderContainer className="header">
        <Select name="mode" onChange={(event) => props.onChange(event.target.value)}>
            {Object.entries(props.layouts).map(([key, value]) => (
                <option key={key} value={value}>{`${key} mode`}</option>
            ))}
        </Select>
    </HeaderContainer>;
}