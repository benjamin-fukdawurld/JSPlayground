import React from 'react';
import styled from 'styled-components';

import RepoBreadcrumb from './RepoBreadcrumb.component';
import MenuActions from './MenuActions.component';

const MenuContainer = styled.div`
    position: relative;
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
            <RepoBreadcrumb owner={props.repo?.owner?.login} repo={props.repo?.name} />
            <MenuActions
                watchers={props.repo?.subscribers_count}
                forks={props.repo?.forks_count}
                stars={props.repo?.watchers_count}
            />
        </MenuHeader>
    </MenuContainer>
}