

import * as React from 'react'
import {graphql, createFragmentContainer} from 'react-relay'

import {createQueryRenderer} from '../environment'

import Todo from './todo'
import AddTodoButton from './todolist-add-todo-button'
import {todolistAll2_data} from './__generated__/todolistAll2_data.graphql'
// import {todolistAll_TodoList_Query} from './__generated__/todolistAll_TodoList_Query.graphql'

type Props = {
    data: todolistAll2_data,  // queryっていうプロパティ名じゃないとcreateQueryRendererは使えない
    id: string,
}

const TodoList = (props: Props) => {
    const todolist = props.data!
    console.log(todolist)
    return (<div>
      <h3>todo list : id={ todolist.id }, { todolist.title }</h3>
      { todolist.todoSet!.edges.map((edge) => {
            console.log('edge -> ', edge)
            if (edge == null || edge.node == null) {
                return
            }
            return <div key={ edge!.node!.id }><Todo parent_id={ props.id } data={ edge!.node! }/></div>
      })}
      <AddTodoButton todolist__id={ todolist.id } />
    </div>)
}

// const todo_list_node_fragment = graphql`
//     fragment todolistAll2_data on TodoListNode
//     @argumentDefinitions(
//         first: { type: "Int" },
//         last: { type: "Int" },
//         before: { type: "String" },
//         after: { type: "String" }
//     ) {
//         id
//         title
//         todoSet(
//             first: $first
//             last: $last
//             before: $before
//             after: $after
//             orderBy: "-created_at"o
//         ) @connection(key: "todolist_todoSet") {
//             pageInfo {
//                 hasNextPage
//                 hasPreviousPage
//                 startCursor
//                 endCursor
//             }
//             edges {
//                 cursor
//                 node {
//                     id
//                     ...todo_data
//                 }
//             }
//         }
//     }    
// `

const TodoListFragment = createFragmentContainer(
    TodoList,
    {
        data: graphql`
        fragment todolistAll2_data on TodoListNode
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
                orderBy: "created_at"  # これがあるとだめだ
            ) @connection(key: "todolist_todoSet", filters: ["orderBy"] ) {
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
        }    
        `
    }
)


import {Environment} from 'relay-runtime'
import {QueryRenderer} from 'react-relay'

const TodoListQuery = (props: {id: string, environment: Environment}) => {
    const props_ = props
    return <QueryRenderer
               environment={ props_.environment }
               query={graphql`
                   query todolistAll2_first_Query($todolist_id: ID!) {
                       todolist(id: $todolist_id) {
                           id
                           ...todolistAll2_data @arguments(first: 100)
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
                   if (props && props.todolist) {
                           return <TodoListFragment id={ props_.id } data={ props.todolist } />
                       }
                       return <span>loading</span>
               } }
    />
}
    
import {withEnvironment} from '../environment'
export default withEnvironment(TodoListQuery)
