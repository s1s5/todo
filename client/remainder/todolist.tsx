import * as React from 'react'
import {graphql, createFragmentContainer, commitMutation, QueryRenderer, ReactRelayContext, createPaginationContainer, RelayPaginationProp} from 'react-relay'

import {createQueryRenderer, withEnvironment} from '../environment'

import Todo from './todo'
// import {todolist_query} from './__generated__/todolist_query.graphql'
import {todolist_data} from './__generated__/todolist_data.graphql'

const addTodoMutation = graphql`
    mutation todolist_addTodo_Mutation($input: TodoCreateMutationInput!) {
        todoCreate(input: $input) {
            todo {
                id
                completed
                text
            }
        }
    }
`

const AddTodoButton = (props:{todolist__id:string}) => (
    <ReactRelayContext.Consumer>
      {
          ({ environment }) => (
              <button onClick={ () => (
                  commitMutation(
                      environment,
                      {
                          mutation: addTodoMutation,
                          variables: {
                              input: {todolist: props.todolist__id},
                          },
                      }
                  ))
              }>add todo</button>
          )
      }
    </ReactRelayContext.Consumer>
)

type Props = {
    //    query: todolist_query,
    data: todolist_data,
    todolist_id: string,
    // } & {
    relay: RelayPaginationProp,
}

const TodoList = (props: Props) => {
    console.log(props)
    return (<div>
      <h3>todo list : id={ props.data.id }, { props.data.title }</h3>
      { props.data.todoSet.edges.map((edge) => (
          <div key={ edge.node.id }><Todo todo={ edge.node }/></div>
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
    </div>)
}


const TodoListPaginated = createPaginationContainer(
    TodoList,
    {
        data: graphql`
            fragment todolist_data on TodoListNode
            @argumentDefinitions(
                count: {type: "Int", defaultValue: 1}
                cursor: {type: "String"}
            ) {
                id
                title
                todoSet(
                    first: $count
                    after: $cursor
                ) @connection(key: "todolist_todoSet") {
                    edges {
                        node {
                            id
                            ...todo_todo
                        }
                    }
                }
            }`,
    },
    {
        // ここから下はなくても大丈夫
        //        direction: 'forward',
        //        getConnectionFromProps(props) {
        //            console.log("getConnectionFromProps")
        //            return props.data && props.data.todoSet;
        //        },
        //        // This is also the default implementation of `getFragmentVariables` if it isn't provided.
        //        getFragmentVariables(prevVars, totalCount) {
        //            console.log("getFragmentVariables")
        //            return {
        //                ...prevVars,
        //                count: totalCount,
        //            };
        //        },

        getVariables(props, {count, cursor}, fragmentVariables) {
            //            console.log("getVariables")
            //            console.log(props)
            //            console.log(count)
            //            console.log(cursor)
            //            console.log(fragmentVariables)
            return {
                count,
                cursor,
                //        orderBy: fragmentVariables.orderBy,
                //        // userID isn't specified as an @argument for the fragment, but it should be a variable available for the fragment under the query root.
                todolist_id: fragmentVariables.todolist_id,
            };
        },
        query: graphql`
            query todolist_Query(
                $count: Int!
                $cursor: String
                $todolist_id: ID!
            ) {
                todolist(id: $todolist_id) {
                    ...todolist_data @arguments(count: $count, cursor: $cursor)
                }
            }`,
    }
);

import {Environment} from 'relay-runtime'
import {todolist_first_QueryResponse} from './__generated__/todolist_first_Query.graphql'

const TodoListQuery = (props: {todolist_id: string, environment: Environment}) => {
    const props_ = props
    return <QueryRenderer
               environment={ props_.environment }
               query={graphql`
                   query todolist_first_Query($todolist_id: ID!) {
                       todolist(id: $todolist_id) {
                           ...todolist_data
                       }
                   }
                   `}
               variables={ {todolist_id: props_.todolist_id} }
               render={ ({error, props, retry}: {error: Error | null, props:todolist_first_QueryResponse, retry: (() => void)} ) => {
                       if (error) {
                           console.log(error)
                           return <span>{error.toString()}</span>;
                       }
                       console.log(props);
                       if (props) {
                           return <TodoListPaginated todolist_id={ props_.todolist_id } data={ props.todolist } />
                       }
                       return <span>loading</span>
               } }
    />
}
export default withEnvironment(TodoListQuery)

// const TodoListFragment = createFragmentContainer(
//     TodoList,
//     {
//         query: graphql`
//             fragment todolist_query on Query @argumentDefinitions(
//                 id: {type: "ID!"},
//             ) {
//                 todolist(id: $id) {
//                     id
//                     title
//                     todoSet {
//                         edges {
//                             node {
//                                 id
//                                 ...todo_todo
//                             }
//                         }
//                     }
//                 }
//             }
//         `
//     }
// )
// 
// export default createQueryRenderer(TodoListFragment, TodoList, {
//     query: graphql`
//         query todolist_TodoList_Query($id: ID!) {
//             ...todolist_query @arguments(id: $id)
//         }
//     `,
//     get_variables: (props:any) => ({id: props.todolist_id})
// })
