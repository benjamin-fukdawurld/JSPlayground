import React from 'react';
import styled from 'styled-components';

const DropdownCaretSpan = styled.span`
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    content: "";
    border-top-style: solid;
    border-top-width: 4px;
    border-right: 4px solid transparent;
    border-bottom: 0 solid transparent;
    border-left: 4px solid transparent;
    margin: 2px 0 0 4px;
`;
const DropdownCaret = (props) => <DropdownCaretSpan className={props.className} />

export default DropdownCaret;