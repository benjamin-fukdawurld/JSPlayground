import React from 'react';

import Box from '@material-ui/core/Box';

export default function TabPanel({ value, index, ...other }) {
    return <Box p={8}
        role="tabpanel"
        hidden={value !== index}
        id={`app-tabpanel-${index}`}
        aria-labelledby={`app-tab-${index}`}
        {...other}
    />;
}