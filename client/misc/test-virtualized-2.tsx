import * as React from 'react'
import {
    InfiniteLoader,
    List,
    WindowScroller,
    AutoSizer,
} from 'react-virtualized';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// 以下のcssを読み込んでおかないと、クリックしたときに変なドットの線が出てくる
//     .ReactVirtualized__Grid {
//         outline: none;
//     }

// SPAで画面遷移したあとに、Windowのスクロール位置を戻す
// https://github.com/taion/react-router-scroll
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
// https://developers.wano.co.jp/1322/

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            width: '100%',
            height: 300,
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);


const VirtualizedExample2 = () => {
    const classes = useStyles();
    const [data, set_data] = React.useState<string[]>([])
    const [loading, set_loading] = React.useState(false)

    const is_row_loaded = ({index}:any) => {
        // console.log(`check loaded : ${index} -> ${data.length} / ${index < data.length} => ${!!data[index]}`)
        //return index < data.length - 1
        return !!data[index]
    }

    const render_row = ({key, index, style}:any) => {
        // console.log(`render_row data.length=${data.length} data[${index}]=${data[index]} loading=${loading}`)
        return (
            <ListItem button style={style} key={key}>
              <ListItemText primary={ data[index] ? data[index] : 'loading'} />
            </ListItem>
        )
//        return <div
//                   key={key}
//                   style={style}
//               >
//          {data[index] ? data[index] : 'loading'}
//        </div>
    }
    const minimumBatchSize = 8  // よくわからないけど、少なくとも全部表示される分くらいはおおきくないとだめ？
    // console.log(`current data.length=${data.length}, loading=${loading}`)
    return (
        <div className={classes.root}>
          <button onClick={() => {
                  const new_data = ['inserted before'].concat(data)
                  set_data(new_data)
          }}>insert before</button>
          <InfiniteLoader
              isRowLoaded={is_row_loaded}
              loadMoreRows={({startIndex, stopIndex}:any) => {
                      console.log(`loadMoreRows called ${startIndex} - ${stopIndex}`)
                      return Promise.resolve().then(() => {
                          console.log(`load more ${startIndex} -> ${stopIndex} ${data.length}`)
                          set_loading(true)
                          
                          const new_data = data.concat()
                          for (let i = startIndex; i <= stopIndex; i++) {
                              new_data[i] = `hello world ${i}`
                          }
                          
                          setTimeout( () => {
                              set_data(new_data)
                              set_loading(false)
                          }, 10)  // 600[msec]
                      })
              }}
              rowCount={ loading ? data.length : data.length + minimumBatchSize }
              minimumBatchSize={minimumBatchSize}
          >
            {({ onRowsRendered, registerChild }) => (
                <AutoSizer>
                  {({ height, width }) => (
                      <List
                          height={height}
                          onRowsRendered={onRowsRendered}
                          ref={registerChild}
                          rowCount={ loading ? data.length + 1 : data.length + 1 }
                          rowHeight={46}
                          rowRenderer={render_row}
                          width={width}
                      />
                  )}
                </AutoSizer>
            )}
          </InfiniteLoader>
        </div>
    )
}

export default VirtualizedExample2
