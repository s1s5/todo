import * as React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    List,
    AutoSizer,
} from 'react-virtualized';

import InfiniteScroll from 'react-infinite-scroller';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(1),
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}))


const TestInfiniteScoller = () => {
    const classes = useStyles()

    const [data, set_data] = React.useState<string[]>([])
    const [loading, set_loading] = React.useState(false)

    const _load_more = (page:number) => {
        if (loading) {
            return 
        }
        set_loading(true)
        setTimeout(() => {
            const new_data = data.concat()
            for (let i = 0; i < 10; i++) {
                new_data.push(`hello world ${new_data.length}`)
            }
            set_data(new_data)
        }, 1000)
    }

    const render_row = ({key, index, style}:any) => {
        return (
            <ListItem button style={style} key={key}>
              <ListItemText primary={ data[index] ? data[index] : 'loading'} />
            </ListItem>
        )
    }

    return (
        <div className={ classes.root }>
        <InfiniteScroll
        pageStart={0}
        loadMore={_load_more}
        hasMore={true}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
        >
                <AutoSizer>
                  {({ height, width }) => (
                      <List
                          height={height}
                          rowCount={ data.length }
                          rowHeight={46}
                          rowRenderer={render_row}
                          width={width}
                      />
                  )}
                </AutoSizer>
    </InfiniteScroll>
        </div>
    )
}

export default TestInfiniteScoller
