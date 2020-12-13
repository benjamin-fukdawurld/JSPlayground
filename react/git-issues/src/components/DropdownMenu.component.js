import React from 'react';
import styled from 'styled-components';
import DropdownCaret from './DropdownCaret.component';

const Summary = styled.summary`
    &:focus {
        outline: none;
    }
    &::-webkit-details-marker {
        display: none;
    }
`;

export default function DropdownMenu(props) {
    const children = React.Children.toArray(props.children);
    return <details className="dropDownMenu">
        <Summary>
            {children[0]}
            <DropdownCaret />
        </Summary>
        <details-menu class="dropdown-menu dropdown-menu-sw" role="menu">
            {children.slice(1).map((child) => child)}
        </details-menu>
    </details>
}