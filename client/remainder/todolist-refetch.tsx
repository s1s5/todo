import * as React from 'react'

import {Environment} from 'relay-runtime'
import {graphql, QueryRenderer, createRefetchContainer, RelayRefetchProp, ReactRelayContext} from 'react-relay'

import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List'


import {withEnvironment} from '../environment'
import Todo from './todo'
import AddTodoButton from './todolist-add-todo-button'
import TodoSubsc from './todo-subsc'

import {todolistRefetch_data} from './__generated__/todolistRefetch_data.graphql'
import {todoSubsc_data as TodoSubscData} from './__generated__/todoSubsc_data.graphql'


const styles = (theme: Theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
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

        console.log("@todolist refetch render")
        console.log(this.props.data)
        const observer = {
            next: (data:TodoSubscData) => console.log('next', data),
            error: (error:Error) => console.log('error', error),
        }
        console.log(observer)
        return (<div>
          <TodoSubsc variables={ {id: this.props.id} } observer={ observer } />
          <h3>{ this.props.data.title }</h3>
          <List className={this.props.classes.root}>
          {
              this.props.data.todoSet.edges.map((edge) => (
                  <div key={ edge.node.id }><Todo data={ edge.node }/></div>
              ))
          }
          </List>
          <AddTodoButton todolist__id={ this.props.data.id } />
          <button onClick={ this._refetch }>refetch</button>
        </div>)
    }

    _refetch = () => {
        const self = this
        this.props.relay.refetch(
            (refetchVariables) => {
                console.log("refetch variables called", refetchVariables)
                return {
                    ...refetchVariables,
                    after: self.props.data.todoSet?.pageInfo.endCursor
                }
            },
            null,  // We can use the refetchVariables as renderVariables
            (error) => {
                if (error) {
                    console.log('Error occurred', error)
                } else {
                    console.log('successfully completed')
                }
            },
            {force: true},  // Assuming we've configured a network layer cache, we want to ensure we fetch the latest data.
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
                count: { type: "Int", defaultValue: 1 },
                after: { type: "String"}
            ) {
                id
                title
                todoSet(
                    first: $count
                    after: $after
                    orderBy: "-created_at"
                ) @connection(key: "todolistRefetch_todoSet") {
                    pageInfo {
                        endCursor
                    }
                    edges {
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
            $count: Int
            $after: String
            $todolist_id: ID!
        ) {
            todolist(id: $todolist_id) {
                ...todolistRefetch_data @arguments(count: $count, after: $after)
            }
        }`
)

const TodoListQuery = (props: {id: string, environment: Environment}) => {
    const props_ = props
    return <QueryRenderer
               environment={ props_.environment }
               query={graphql`
                   query todolistRefetch_first_Query($todolist_id: ID!) {
                       todolist(id: $todolist_id) {
                           ...todolistRefetch_data
                       }
                   }
               `}
               variables={ {todolist_id: props_.id} }  // TODO: make type safe
               render={ ({error, props, retry}: any) => {
                       if (error) {
                           console.log(error)
                           return <span>{error.toString()}</span>;
                       }
                       console.log(props);
                       if (props) {
                           return <TodoListRefetch id={ props_.id } data={ props.todolist } />
                       }
                       return <span>loading</span>
               } }
    />
}
    
export default withEnvironment(TodoListQuery)
