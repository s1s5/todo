import * as React from 'react'
import {
    InfiniteLoader,
    List,
    WindowScroller,
    AutoSizer,
} from 'react-virtualized';


const VirtualizedExample2 = () => {
    const [data, set_data] = React.useState<string[]>([])
    const [loading, set_loading] = React.useState(false)

    const is_row_loaded = ({index}:any) => {
        // console.log(`check loaded : ${index} -> ${data.length} / ${index < data.length} => ${!!data[index]}`)
        //return index < data.length - 1
        return !!data[index]
    }

    const render_row = ({key, index, style}:any) => {
        // console.log(`render_row data.length=${data.length} data[${index}]=${data[index]} loading=${loading}`)
        return <div
                   key={key}
                   style={style}
               >
          {data[index] ? data[index] : 'loading'}
        </div>
    }

    // console.log(`current data.length=${data.length}, loading=${loading}`)
    return (
        <>
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
        rowCount={ loading ? data.length : data.length + 15 }
        
        >
        {({ onRowsRendered, registerChild }) => (
            <List
            height={500}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowCount={ loading ? data.length : data.length + 1 }
            rowHeight={20}
            rowRenderer={render_row}
            width={300}
            />
        )}
          </InfiniteLoader>
        </>
    )
}

export default VirtualizedExample2
