import * as React from 'react'
import {graphql, commitMutation, QueryRenderer, ReactRelayContext, createPaginationContainer, RelayPaginationProp} from 'react-relay'

import {withEnvironment} from '../gql-utils'

import Todo from './todo'
import AddTodoButton from './todolist-add-todo-button'
import {todolistPaginated_data} from './__generated__/todolistPaginated_data.graphql'
import {useIdFromParam} from './utils'


type Props = {
    data: todolistPaginated_data,
    id?: string,
} & {  // 継承もどき
    relay: RelayPaginationProp,
}

const TodoList = (props: Props) => {
    const id = useIdFromParam(props.id)

    console.log(props.data.todoSet)
    if (props.data.todoSet === null) {
        return <div>some error occurred</div>
    }

    return (<div>
      <h3>todo list : id={ props.data.id }, { props.data.title }</h3>
      { props.data.todoSet.edges.map((edge) => (
          <div key={ edge!.node!.id }><Todo parent_id={ id } data={ edge!.node! }/></div>
      ))}
      <AddTodoButton todolist__id={ props.data.id } />
      <button onClick={ () => {
              console.log("read more")
              console.log("props.relay.hasMore()", props.relay.hasMore())
              console.log("props.relay.isLoading()", props.relay.isLoading())
              if ((!props.relay.hasMore()) || props.relay.isLoading()) {
                  return;
              }
              console.log("load more!!")
              props.relay.loadMore(
                  1,  // Fetch the next 10 feed items
                  error => {
                      console.log(error);
                  },
              );
      }}>read more</button>
      <button onClick={ () => {
              props.relay.refetchConnection(1, (error: Error | null | undefined) => { console.log(error) }, {/* variables */})
      }}>refetch</button>
    </div>)
}


const TodoListPaginated = createPaginationContainer(
    TodoList,
    {
        data: graphql`
            fragment todolistPaginated_data on TodoListNode
            @argumentDefinitions(
                count: {type: "Int", defaultValue: 1}
                cursor: {type: "String"}
            ) {
                id
                title
                todoSet(
                    first: $count
                    after: $cursor
                ) @connection(key: "todolistPaginated_todoSet") {
                    edges {
                        node {
                            id
                            ...todo_data
                        }
                    }
                }
            }`,
    },
    {
        // ここから下はなくても大丈夫
        direction: 'forward',
        getConnectionFromProps(props) {
            return props.data && props.data.todoSet;
        },
        getFragmentVariables(prevVars, totalCount) {
            return {
                ...prevVars,
                count: totalCount,
            };
        },

        getVariables(props, {count, cursor}, fragmentVariables) {
            return {
                count,
                cursor,
                todolist_id: fragmentVariables.todolist_id,
            };
        },
        // ここから必要
        query: graphql`
            query todolistPaginated_Query(
                $count: Int!
                $cursor: String
                $todolist_id: ID!
            ) {
                todolist(id: $todolist_id) {
                    ...todolistPaginated_data @arguments(count: $count, cursor: $cursor)
                }
            }`,
    }
);

import {Environment} from 'relay-runtime'
import {todolistPaginated_first_Query,
        todolistPaginated_first_QueryResponse} from './__generated__/todolistPaginated_first_Query.graphql'

const TodoListQuery = (props: {id?: string, environment: Environment}) => {
    const id = useIdFromParam(props.id)
    const props_ = props
    // let Q: new() => React.Component<QueryRenderer<todolistPaginated_first_Query>["props"]> = QueryRenderer;
    return <QueryRenderer<todolistPaginated_first_Query>
               environment={ props_.environment }
               query={graphql`
                   query todolistPaginated_first_Query($todolist_id: ID!) {
                       todolist(id: $todolist_id) {
                           ...todolistPaginated_data
                       }
                   }
                   `}
               variables={ {todolist_id: id} }  // TODO: make type safe
               render={ ({error, props, retry}) => {
                       //: {error: Error | null, props:todolistPaginated_first_QueryResponse, retry: ((() => void) | null)} 
                       if (error) {
                           console.log(error)
                           return <span>{error.toString()}</span>;
                       }
                       console.log(props);
                       if (props) {
                           return <TodoListPaginated id={ id } data={ props.todolist! } />
                       }
                       return <span>loading</span>
               } }
    />
}
export default withEnvironment(TodoListQuery)
