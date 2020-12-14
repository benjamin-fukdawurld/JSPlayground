import React, { Component } from 'react';
import styled from 'styled-components';

import MuiCodeIcon from '@material-ui/icons/Code';

import MuiTabs from '@material-ui/core/Tabs'
import MuiTab from '@material-ui/core/Tab'


import Menu from './Menu.component';

const Tabs = styled(MuiTabs)`
    padding: 0 12px;
`;

const Tab = styled(MuiTab)`
    text-transform: capitalize !important;
    min-width: 0 !important;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
     Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji !important;
    font-size: 14px;
`;

const TabLabelContainer = styled.span`
    display: inline-flex!important;
    align-items: center;
`;

const CodeIcon = styled(MuiCodeIcon)`
    width: 20px!important;
    height: 20px!important;
`;

export default class MainContainer extends Component {
    render() {
        return <main className="mainContainer">
            <Menu repo={this.props.repo} />
            <Tabs value={1}>
                <Tab label={<TabLabelContainer><CodeIcon />Code</TabLabelContainer>} />
                <Tab label={"Issues"} />
                <Tab label={"Pull requests"} />
                <Tab label={"Actions"} />
                <Tab label={"projects"} />
                <Tab label={"Wiki"} />
                <Tab label={"Security"} />
                <Tab label={"Insights"} />
            </Tabs>
            {JSON.stringify(this.props.issues, null, ' ')}
        </main>;
    }
}