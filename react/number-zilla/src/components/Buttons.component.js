import { Button, ButtonGroup, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        marginTop: 4,
        textAlign: 'center'
    }
});

export default function Buttons(props) {
    const classes = useStyles();

    return <Container maxWidth="xs" className={classes.root}>
        <ButtonGroup
            variant="contained"
            color="primary"
        >
            <Button
                onClick={props.onHelp}
                disabled={props.playables.length === 0}
            >
                help
            </Button>
            <Button
                onClick={props.onUndo}
                disabled={props.history.length === 0}
            >
                undo
            </Button>
            <Button
                onClick={props.onAdd}
                disabled={props.numbers.length === 0}
            >
                add
            </Button>
            <Button
                onClick={props.onRestart}
                disabled={props.history.length === 0}
            >
                restart
            </Button>
        </ButtonGroup>
    </Container>
}