import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { List, AutoSizer } from 'react-virtualized';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: 600,
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

function renderRow(props: any) {
    const { key, index, style } = props;

    return (
        <ListItem button style={style} key={key}>
        <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

export default function VirtualizedList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <AutoSizer>
        {({ height, width }) => (
            <List height={height} width={width} rowHeight={46} rowCount={200}
                  rowRenderer={renderRow}
            />
        )}
            </AutoSizer>
        </div>
    );
}
