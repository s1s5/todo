import React from 'react'
import {
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
    InfiniteLoader,
    List,
    WindowScroller
} from 'react-virtualized'
import listItems from './list-items'
import Tweet from './tweet'

export default class RVComponents extends React.Component {
    _renderCache = new CellMeasurerCache({ defaultHeight: 85, fixedWidth: true })
    _mostRecentWidth = 0
    _resizeAllFlag = false
    _renderInfiniteLoaderRef:any
    _renderListRef:any

    state = {
        tweets: listItems,
        isLoading: false,
        hasMore: true
    }

    componentDidUpdate(prevProps:any, prevState:any) {
        const prevTweetList = prevState.tweets
        const updatedTweetList = this.state.tweets
        console.log('hasmore', this.state.hasMore)

        if (this._resizeAllFlag) this._reSizeAllRender()

        if (prevTweetList !== updatedTweetList) {
            const index = prevTweetList.length
            this._reSizeRowRender(index)
        }
    }

    _infiniteRowCount = () =>
        !this.state.isLoading && this.state.hasMore
                          ? this.state.tweets.length + 1
                          : this.state.tweets.length

    _listRowCount = () =>
        this.state.hasMore ? this.state.tweets.length + 1 : this.state.tweets.length

    _loadMoreRows = this.state.isLoading
                  ? () => Promise.resolve()
                      : () =>
                          Promise.resolve().then(() => {
                              this.setState({
                                  isLoading: true
                              })

                              const prevTweets = this.state.tweets
                              const nextTweets = [...prevTweets, ...listItems]

                              setTimeout(() => {
                                  this.setState({
                                      tweets: nextTweets,
                                      isLoading: false,
                                      hasMore: nextTweets.length < 80 ? true : false
                                  })
                              }, 600)
                          })

    _isRowLoaded = ({ index }:any) => {
        return !!this.state.tweets[index]
    }

    _renderRow = ({ index, key, parent, style }:any) => {
        const tweet = this.state.tweets[index]

        return (
            <CellMeasurer
            cache={this._renderCache}
            columnIndex={0}
            key={key}
            rowIndex={index}
            parent={parent}>
            {({ measure }) => (
                <div style={style} className="row">
                {this._isRowLoaded({ index }) ? (
                    <Tweet
                    key={tweet.created_at}
                    measure={measure}
                    index={index}
                    {...tweet}
                    />
                ) : (
                    <div>loading</div>
                )}
                </div>
            )}
            </CellMeasurer>
        )
    }

    render() {
        console.log('Total render tweets', this.state.tweets.length)

        return (
            <div>
            <div className="count">Loaded tweets: {this.state.tweets.length}</div>
            <div className="infWrapper">
            <InfiniteLoader
            isRowLoaded={this._isRowLoaded}
            loadMoreRows={this._loadMoreRows}
            ref={el => (this._renderInfiniteLoaderRef = el)}
            rowCount={this._infiniteRowCount()}
            threshold={0}
            minimumBatchSize={1}>
            {({ onRowsRendered, registerChild }) => (
                <WindowScroller>
                {({ height, isScrolling, scrollTop, onChildScroll }) => (
                    <AutoSizer disableHeight={true} onResize={this._onResize}>
                    {({ width }) => (
                        <List
                        autoHeight={true}
                        deferredMeasurementCache={this._renderCache}
                        height={height}
                        isScrolling={isScrolling}
                        onRowsRendered={onRowsRendered}
                        onScroll={onChildScroll}
                        overscanRowCount={5}
                        ref={el => {
                            this._renderListRef = el
                            registerChild(el)
                        }}
                        rowHeight={this._renderCache.rowHeight}
                        rowRenderer={this._renderRow}
                        rowCount={this._listRowCount()}
                        scrollTop={scrollTop}
                        width={width}
                        />
                    )}
                    </AutoSizer>
                )}
                </WindowScroller>
            )}
            </InfiniteLoader>
                </div>
                </div>
        )
    }

    _onResize = ({ width }:any) => {
        if (this._mostRecentWidth && this._mostRecentWidth !== width) {
            this._resizeAllFlag = true
            process.nextTick(this._reSizeAllRender)
        }

        this._mostRecentWidth = width
    }

    _reSizeAllRender = () => {
        console.warn('RESIZE!')

        this._resizeAllFlag = false
        this._renderCache.clearAll()
        if (this._renderListRef) {
            this._renderListRef.recomputeRowHeights()
        }
    }

    _reSizeRowRender = (index:any) => {
        this._renderCache.clear(index, 0)
        if (this._renderListRef) this._renderListRef.recomputeRowHeights(index)
    }
}
