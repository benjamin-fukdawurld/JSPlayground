import React from 'react';

import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core';

export default function Home() {
    return <Box>
        <Typography variant="h2">
            Welcome to 2d games project
        </Typography>

        <Typography>
            The point of this project is to develop several classic 2d games using native javascript
            and HTML5 canvas
        </Typography>
    </Box>;
}