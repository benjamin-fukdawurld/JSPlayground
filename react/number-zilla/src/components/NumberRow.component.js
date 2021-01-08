import { Component } from "react";

import Grid from '@material-ui/core/Grid';
import NumberCell from './NumberCell.component';

export default class NumberRow extends Component {
    render() {
        return <Grid container
            direction="row"
        >
            {this.props.numbers.map((number, index) => {
                return <Grid item xs key={index}>
                    <NumberCell
                        highlighted={this.props.highlighted.includes(index)}
                        number={number}
                        position={index}
                        selected={!!this.props.selected.find(sel => sel.x === index)}
                        onClick={this.props.onClick}
                    />
                </Grid>;
            })}
        </Grid>;
    }
}