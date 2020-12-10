import React from 'react';
import styled from 'styled-components';

import Button from './Button.component';

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

export default function Layout(props) {
    return <Table>
        <TBody>
            {props.layout.map((row, index) => {
                return <ButtonRow key={index}>
                    {row.map((button, index) => (
                        <Button
                            key={index}
                            {...button}
                            onClick={props.onClick}
                        />)
                    )}
                </ButtonRow>;
            })}
        </TBody>
    </Table>;
}