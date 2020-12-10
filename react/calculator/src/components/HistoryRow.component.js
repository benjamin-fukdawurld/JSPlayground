import React from 'react';
import styled from 'styled-components';

const HistoryTableRow = styled.tr`
    width: 90%;
    color: white;
`;

const HistoryOperation = styled.td`
    width: 65%;
    padding-left: 15px;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: rgba(255, 255, 255, 0.01);
`;

const HistoryResult = styled.td`
    width: 30%;
    text-align: right;
    padding-right: 15px;
    font-weight: bolder;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: rgba(255, 255, 255, 0.01);
`;

const HistoryEqualSign = styled.td`
    width: 5%;
    text-align: center;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: rgba(255, 255, 255, 0.01);
`;

export default function HistoryRow(props) {
    return <HistoryTableRow
        className="historyRow"
        onClick={() => props.onClick(props.operation)}
    >
        <HistoryOperation className="history-operation">
            {props.operation}
        </HistoryOperation>
        <HistoryEqualSign className="history-equalSign">
            =
        </HistoryEqualSign>
        <HistoryResult className="history-result">
            {props.result}
        </HistoryResult>
    </HistoryTableRow>
}