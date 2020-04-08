import * as React from 'react'
import {graphql, createFragmentContainer} from 'react-relay'

import {DefaultQueryRenderer} from '../gql-utils'
import {useIdFromParam} from './utils'

import Todo from './todo'
import AddTodoButton from './todolist-add-todo-button'
import {todolistAll_query} from './__generated__/todolistAll_query.graphql'
// import {todolistAll_TodoList_Query} from './__generated__/todolistAll_TodoList_Query.graphql'
// import TodoListSubsc from './todolist-subsc'

type Props = {
    query: todolistAll_query,  // queryっていうプロパティ名じゃないとcreateQueryRendererは使えない
    id: string,
}

const TodoList = (props: Props) => {
    const todolist = props.query!.todolist!
    console.log(todolist)
    const observer2 = {
        next: (data: any) => {
            console.log('next2', data)
        },
        error: (error:Error) => console.log('error2', error),
    }

    return (<div>
      {/* <TodoListSubsc variables={ {id: props.id} } observer={ observer2 } /> */}
      <h3>todo list : id={ todolist.id }, { todolist.title }</h3>
      { todolist.todoSet!.edges.map((edge) => {
//            console.log('edge -> ', edge)
//            if (edge == null || edge.node == null) {
//                return
//            }
            return <div key={ edge!.node!.id }><Todo parent_id={ props.id } data={ edge!.node! }/></div>
      })}
      <AddTodoButton todolist__id={ todolist.id } />
    </div>)
}

const TodoListFragment = createFragmentContainer(
    TodoList,
    {
        query: graphql`
            fragment todolistAll_query on Query @argumentDefinitions(
                id: {type: "ID!"},
            ) {
                todolist(id: $id) {
                    id
                    title
                    todoSet(first: 10) @connection(key: "todolist_todoSet") {
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
            }
        `
    }
)

import {todolistAll_TodoList_Query} from './__generated__/todolistAll_TodoList_Query.graphql'

const TodoListAllQuery = () => {
    const id = useIdFromParam()
    return <DefaultQueryRenderer<todolistAll_TodoList_Query>
      query={graphql`
          query todolistAll_TodoList_Query($id: ID!) {
              ...todolistAll_query @arguments(id: $id)
          }
      `}
    variables={ {id} }
    render={ ({error, props, retry}: any) => {
        if (error) {
            console.log("error: ", error)
            return <span>{error.map((e:any) => e.message)}</span>;
        }
        if (props) {
            return <TodoListFragment id={ id } query={ props } />
        }
        return <span>loading information</span>
    } } 
      />
}


export default TodoListAllQuery
