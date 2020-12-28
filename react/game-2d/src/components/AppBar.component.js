import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './TabPanel.component';

export default function AppBar(props) {

    return <React.Fragment>
        <MuiAppBar>
            <Tabs
                value={props.currentTab}
                onChange={props.onTabChange}
            >
                {
                    props.tabs.map(tab => <Tab label={tab.label} key={tab.label} />)
                }
            </Tabs>
        </MuiAppBar>
        {
            props.tabs.map((tab, index) => {
                return (<TabPanel key={tab.label} index={index} value={props.currentTab}>
                    {tab.node}
                </TabPanel>)
            })
        }
    </React.Fragment>;
}