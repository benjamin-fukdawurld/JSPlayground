import React from 'react';
import styled from 'styled-components';
import DropdownCaret from './DropdownCaret.component';
import PropTypes from 'prop-types';


const Summary = styled.summary`
    display: inline-flex;
    align-items: center;
    &:focus {
        outline: none;
    }
    &::-webkit-details-marker {
        display: none;
    }
`;

export default function DropdownMenu(props) {
    const children = React.Children.toArray(props.children);
    const Caret = props.caretElement;
    return <details className={props.className}>
        <Summary>
            {children[0]}
            {Caret}
        </Summary>
        <details-menu class="dropdown-menu dropdown-menu-sw" role="menu">
            {children.slice(1).map((child) => child)}
        </details-menu>
    </details>
}

DropdownMenu.propTypes = {
    caretElement: PropTypes.element
};

DropdownMenu.defaultProps = {
    caretElement: <DropdownCaret />
}