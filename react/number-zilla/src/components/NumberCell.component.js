import { ToggleButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: props => ({
        color: 'rgb(220, 220, 0)',
        backgroundColor: props.highlighted ? 'rgb(0, 255, 0, 75%)' : 'rgb(0, 0, 255, 60%)'
    })
})

export default function NumberCell(props) {
    const classes = useStyles(props);

    return <ToggleButton
        className={classes.root}
        value={props.position}
        disabled={props.number <= 0}
        onClick={() => props.onClick(props.position)}
        selected={props.selected}
    >
        {Math.abs(props.number) || ""}
    </ToggleButton>;
}