import React from 'react';
import HistoryRow from './HistoryRow.component';
import styled from 'styled-components';

const HistoryContainer = styled.div`
    height: 117px;
    margin: 0px 0px 0px 0px;
    border-top-style: solid;
    border-bottom-style: solid;
    border-width: 1px;
    position: relative;
    background-color: #353535;
    overflow: hidden;
    &:focus {
        overflow-y: scroll;
    }
    &:hover {
        overflow-y: scroll;
    }
`;

const HistoryTable = styled.table`
    width: 99%;
    border-collapse: collapse;
`;

const HistoryBody = styled.tbody`
    width: 100%;
    vertical-align: baseline;
`;

export default function History(props) {
    return <HistoryContainer className="history">
        <HistoryTable className="historyTable">
            <HistoryBody>
                {props.history.map(({ operation, result }, index) => (
                    <HistoryRow
                        key={index}
                        operation={operation}
                        result={result}
                        onClick={props.onClick}
                    />
                ))}
            </HistoryBody>
        </HistoryTable>
    </HistoryContainer>;
}