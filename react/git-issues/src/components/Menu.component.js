import React from 'react';
import styled from 'styled-components';

import RepoBreadcrumb from './RepoBreadcrumb.component';

const MenuContainer = styled.div`
    padding-top: 16px;
    margin-bottom: 32px;
    width: 100%
`;

const MenuHeader = styled.div`
    display: flex;
    padding-left: 32px;
    padding-right: 32px;
    margin-bottom: 16px;
`;

export default function Menu(props) {
    return <MenuContainer>
        <MenuHeader>
            <RepoBreadcrumb owner={props.owner} repo={props.repo} />
        </MenuHeader>
    </MenuContainer>
}