import * as React from 'react'

import {Environment} from 'relay-runtime'
import {graphql, QueryRenderer, createRefetchContainer, RelayRefetchProp, ReactRelayContext} from 'react-relay'

import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {
    Container,
    Divider
} from '@material-ui/core'

import List from '@material-ui/core/List'


import {withEnvironment} from '../environment'
import Todo from './todo'
import AddTodoButton from './todolist-add-todo-button'
import TodoSubsc from './todo-subsc'
import TodoListSubsc from './todolist-subsc'

import {todolistRefetch_data} from './__generated__/todolistRefetch_data.graphql'
import {todoSubsc_data as TodoSubscData} from './__generated__/todoSubsc_data.graphql'

import TodoUpdateForm from './todo-update'
import SingleFileUpload from './single-file-upload'

const styles = (theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        maxHeight: '100%',
//        position: 'absolute',  // 使えない、elementに直接指定
        width: '100%',
        height: '100%',
//        overflowY: 'auto',  // 使えない
//        overflowX: 'hidden',  // 使えない
    },
})

type Props = {
    id: string,
    data: todolistRefetch_data,
    relay: RelayRefetchProp,
} & WithStyles<typeof styles>

type State = {
}

class TodoList_ extends React.Component<Props, State> {

    state: Readonly<State> = {
    }
    
    render() {
        // console.log("@todolist refetch render")
        console.log(this.props.data)

        const observer1 = {
            next: (data:TodoSubscData) => {
                console.log('next1', data)
//                console.log(data.operation)
//                console.log(data.todolist)
//                console.log(data.todo)
            },
            error: (error:Error) => console.log('error1', error),
        }
        const observer2 = {
            next: (data: any) => {
                console.log('next2', data)
            },
            error: (error:Error) => console.log('error2', error),
        }
        // console.log(observer)
        /* console.log(this.props.data.todoSet.pageInfo)
         * console.log(this.props.data.todoSet.edges) */
        return (<div>
          <TodoUpdateForm id={ this.props.data.todoSet!.edges[0]!.node!.id } />
          <TodoSubsc variables={ {id: this.props.id} } observer={ observer1 } />
          {/* <TodoListSubsc variables={ {id: this.props.id} } observer={ observer2 } /> */}
          <h3>{ this.props.data.title }</h3>
          <Container maxWidth="sm" >
            <List className={this.props.classes.root}>
          {
              this.props.data.todoSet!.edges.map((edge) => (
                  <div key={ edge!.node!.id }><div><Todo parent_id={ this.props.id } data={ edge!.node! }/></div></div>
              ))
          }
          </List>
          </Container>
          <AddTodoButton todolist__id={ this.props.data.id } />
          <button onClick={ this._refetch }>refetch-next</button>
          <button onClick={ this._refetch2 }>refetch-prev</button>
          <Divider/>
          <SingleFileUpload />
        </div>)
    }

    _refetch = () => {
        const self = this
        this.props.relay.refetch(
            (refetchVariables) => {
                // console.log("refetch variables called", refetchVariables)
                return {
                    first: 1,
                    after: self.props.data.todoSet?.pageInfo.endCursor
                }
            },
            null,  // We can use the refetchVariables as renderVariables
            (error) => {
                if (error) {
                    console.log('Error occurred', error)
                } else {
                    // console.log('successfully completed')
                }
            },
            {
                force: true,  // Assuming we've configured a network layer cache, we want to ensure we fetch the latest data.
                fetchPolicy: 'network-only',
            },
        );
    }

    _refetch2 = () => {
        const self = this
        this.props.relay.refetch(
            (refetchVariables) => {
                // console.log("refetch variables called", refetchVariables)
                // { first : 1} だけだと今までの結果が消える
                // { last : 1, before: ...} だと追加したあとで表示されるベキであっても無視される。
                return {
                    last: 1,
                    before: self.props.data.todoSet?.pageInfo.startCursor,
                }
            },
            null,  // We can use the refetchVariables as renderVariables
            (error) => {
                if (error) {
                    console.log('Error occurred', error)
                } else {
                    // console.log('successfully completed')
                }
            },
            {
                force: true,  // Assuming we've configured a network layer cache, we want to ensure we fetch the latest data.
                fetchPolicy: 'network-only',
            },
        );
    }
}
const TodoList = withStyles(styles)(TodoList_)

const TodoListRefetch = createRefetchContainer(
    TodoList,
    {
        data: graphql`
            fragment todolistRefetch_data on TodoListNode
            @argumentDefinitions(
                first: { type: "Int" },
                last: { type: "Int" },
                before: { type: "String" },
                after: { type: "String" }
            ) {
                id
                title
                todoSet(
                    first: $first
                    last: $last
                    before: $before
                    after: $after
                    orderBy: "-created_at"
                ) @connection(key: "todolist_todoSet") {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                    }
                    edges {
                        cursor
                        node {
                            id
                            ...todo_data
                        }
                    }
                }
            }`
    },
    graphql`
        query todolistRefetchQuery(
            $first: Int
            $last: Int
            $before: String
            $after: String
            $todolist_id: ID!
        ) {
            todolist(id: $todolist_id) {
                ...todolistRefetch_data @arguments(first: $first, last: $last,
                                                   before: $before, after: $after)
            }
        }`
)

import {todolistRefetch_first_Query} from './__generated__/todolistRefetch_first_Query.graphql'

const TodoListQuery = (props: {id: string, environment: Environment}) => {
    const props_ = props
    return <QueryRenderer<todolistRefetch_first_Query>
               environment={ props_.environment }
               query={graphql`
                   query todolistRefetch_first_Query($todolist_id: ID!) {
                       todolist(id: $todolist_id) {
                           ...todolistRefetch_data @arguments(first: 1)
                       }
                   }
               `}
               variables={ {todolist_id: props_.id} }  // TODO: make type safe
               render={ ({error, props, retry}: any) => {
                       if (error) {
                           console.log(error)
                           return <span>{error.toString()}</span>;
                       }
                   // console.log(props);
                       if (props && props.todolist) {
                           return <TodoListRefetch id={ props_.id } data={ props.todolist } />
                       }
                       return <span>loading</span>
               } }
    />
}
    
export default withEnvironment(TodoListQuery)
