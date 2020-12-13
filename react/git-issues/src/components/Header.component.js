import React from 'react';
import styled from 'styled-components';

import GitHubIcon from './GitHubIcon.component';
import SearchBar from './SearchBar.component';
import NotificationIcon from './NotificationIcon.component';
import AddIcon from './AddIcon.component';
import DropdownMenu from './DropdownMenu.component';
import UserAvatar from './UserAvatar.component';

const HeaderContainer = styled.header`
    background-color: #24292E;
    height: 30px;
    padding: 16px 32px
`;

const NavBar = styled.nav`
    position: relative;
    display: flex;
    align-items: center;
`;

const NavItemGroup = styled.ul`
    vertical-align: middle;
    list-style-type: none;
    display: inline-block;
    margin: -16px 16px -16px 0;
    padding: 16px 0 16px 0;
`;

const NavItem = styled.li`
    display: inline-block;
    padding-right: 16px;
`;

const NavLink = styled.a`
    color: white;
    font-weight: 600;
    white-space: nowrap;
    text-decoration: none;
    font-size: 14px;
    
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
`;

const RightNavItemGroup = styled(NavItemGroup)`
    position: absolute;
    right: 0;
    margin-right: 0;
`;

const RightNavItem = styled(NavItem)`
    height: 100%;
    padding-right: 0;
    padding-left: 16px;
`;

const NotificationLink = styled(NavLink)`
    display: inline-flex;
    align-items: center;
    margin: 0;
    height: 30px;
`;

export default function Header(props) {
    return <HeaderContainer>
        <NavBar>
            <GitHubIcon />
            <SearchBar />
            <NavItemGroup>
                <NavItem>
                    <NavLink
                        className="navItem"
                        href="https://github.com/pulls"
                    >
                        Pull requests
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className="navItem"
                        href="https://github.com/issues"
                    >
                        Issues
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className="navItem"
                        href="https://github.com/marketplace"
                    >
                        Marketplace
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className="navItem"
                        href="https://github.com/notifications"
                    >
                        Explore
                    </NavLink>
                </NavItem>
            </NavItemGroup>

            <RightNavItemGroup>
                <RightNavItem>
                    <NotificationLink
                        className="navItem"
                        href="https://github.com/notifications"
                    >
                        <NotificationIcon />
                    </NotificationLink>
                </RightNavItem>
                <RightNavItem className="navItem">
                    <DropdownMenu>
                        <AddIcon />
                    </DropdownMenu>
                </RightNavItem>
                <RightNavItem className="navItem">
                    <DropdownMenu>
                        <UserAvatar />
                    </DropdownMenu>
                </RightNavItem>
            </RightNavItemGroup>
        </NavBar>
    </HeaderContainer>;
}