import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { List, AutoSizer } from 'react-virtualized';
import VisibilitySensor from 'react-visibility-sensor'


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

let vlist:any | null = null
export default function VirtualizedList() {
    const classes = useStyles();
    const [min_row, set_min_row] = React.useState(0)
    const [max_row, set_max_row] = React.useState(30)
    const [scroll_to_index, set_scroll_to_index] = React.useState(max_row - 1)
    const [loading, set_loading] = React.useState(false)

    // もっといいほうほうはないのか・・・
    const [active, set_active] = React.useState(false)
    React.useEffect(() => {
        setTimeout(() => {
            set_active(true)
        }, 100)
    })

    const on_prev_loading = (isVisible:boolean) => {
        console.log("on_prev_loading ", isVisible, loading, min_row, active)
        if ((!isVisible) || loading) {
            return
        }
        set_loading(true)
        // set_scroll_to_index(-1)
        setTimeout(() => {
            set_min_row(p => p - 10)
            if (!(vlist == null)) {
                // console.log("scrollToRow!!", 8)
                vlist.scrollToRow(10)
            }
            
            setTimeout(() => {
                // console.log("set loading false")
                set_loading(false)
            }, 100)
        }, 1000)
    }
    const on_next_loading = (isVisible: boolean) => {
        console.log("on_next_loading ", isVisible, loading, min_row, max_row, active)
        if ((!isVisible) || loading) {
            return
        }
        set_loading(true)
        setTimeout(() => {
            set_max_row(p => p + 10)
            set_scroll_to_index((max_row - min_row) - 1)
            if (!(vlist == null)) {
                vlist.scrollToRow((max_row - min_row) - 1)
            }
            setTimeout(() => {
                // console.log("set loading false")
                set_loading(false)
            }, 100)

        }, 1000)
    }

    const row_count = max_row - min_row
    const render_row = (props:any) => {
        const { key, index, style } = props;
        if (index == 0) {
            return (
                <VisibilitySensor active={ active } key={key} onChange={on_prev_loading} offset={{top: 56}} >
                  <ListItem button style={style}>
                    <ListItemText primary="prev loading ..." />
                  </ListItem>
                </VisibilitySensor>
            )
        } else if (index == row_count - 1) {
            return (
                <VisibilitySensor active={ active } key={key} onChange={on_next_loading}>
                <ListItem button style={style}>
                  <ListItemText primary="next loading" />
                </ListItem>
                </VisibilitySensor>
            )
        }
        return (
            <ListItem button style={style} key={key}>
              <ListItemText primary={`Item ${index + 1 + min_row}`} />
            </ListItem>
        );
    }

    return (
        <div className={classes.root}>
        <AutoSizer>
        {({ height, width }) => (
            <List height={height} width={width} rowHeight={46} rowCount={row_count}
                  rowRenderer={render_row} scrollToIndex={scroll_to_index}
                  ref={ (instance) => {
                          vlist = instance
                          // console.log("set_list_instance : ", instance)
                          //set_list_instance(instance)
                  } }
            />
        )}
            </AutoSizer>
        </div>
    );
}
