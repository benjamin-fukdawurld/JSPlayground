import React, { Component } from 'react';
import styled from 'styled-components';

import MuiCodeIcon from '@material-ui/icons/Code';

import MuiTabs from '@material-ui/core/Tabs'
import MuiTab from '@material-ui/core/Tab'

import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { green, red } from '@material-ui/core/colors';

import Menu from './Menu.component';
import ContributePanel from './ContributePanel.component';

const Tabs = styled(MuiTabs)`
    padding: 0 12px;
    margin-bottom: 32px;
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

const Div = styled.div`
    background-color: #fafbfc;
    box-shadow: inset 0 -1px 0 #eaecef;
`;

const Content = styled.div`
    padding: 0 32px;
`;

function Issue(props) {
    const link = (<Link href={props.html_url}>
        {props.title}
    </Link>);
    return <ListItem>
        <ListItemIcon>
            <ErrorOutlineIcon style={{ color: (props.state === 'open' ? green[500] : red[500]) }} />
        </ListItemIcon>
        <ListItemText primary={link} secondary={props.number} />
    </ListItem>
}

export default class MainContainer extends Component {
    render() {
        return <main className="mainContainer">
            <Div>
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
            </Div>
            <Content>
                <ContributePanel />
                <List>
                    {this.props.issues.map((issue, index) => {
                        return <Issue key={index} {...issue} />
                    })}
                </List>
            </Content>
        </main>;
    }
}