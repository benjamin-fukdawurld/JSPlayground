import React from 'react';

import Grid from '@material-ui/core/Grid';

import NumberRow from './NumberRow.component';

export default function NumberTable(props) {
    let highlighted = props.highlighted || [];
    return <Grid container
        direction="column"
    >
        {props.numbers.map((row, index) => (
            <Grid item key={index}>
                <NumberRow
                    highlighted={highlighted.filter(p => p.y === index).map(p => p.x)}
                    numbers={row}
                    selected={props.selected.filter(sel => sel.y === index)}
                    onClick={x => props.onClick({ x, y: index })}
                />
            </Grid>)
        )}
    </Grid>
}