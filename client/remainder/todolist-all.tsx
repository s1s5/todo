import * as React from 'react'
import {graphql, createFragmentContainer} from 'react-relay'

import {createQueryRenderer} from '../environment'

import Todo from './todo'
import AddTodoButton from './todolist-add-todo-button'
import {todolistAll_query} from './__generated__/todolistAll_query.graphql'
// import {todolistAll_TodoList_Query} from './__generated__/todolistAll_TodoList_Query.graphql'

type Props = {
    query: todolistAll_query,  // queryっていうプロパティ名じゃないとcreateQueryRendererは使えない
    id: string,
}

const TodoList = (props: Props) => {
    const todolist = props.query!.todolist!
    return (<div>
      <h3>todo list : id={ todolist.id }, { todolist.title }</h3>
      { todolist.todoSet.edges.map((edge) => (
          <div key={ edge!.node!.id }><Todo data={ edge!.node! }/></div>
      ))}
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
                    todoSet {
                        edges {
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

export default createQueryRenderer<todolistAll_TodoList_Query, Props>(TodoListFragment, TodoList, {
    query: graphql`
        query todolistAll_TodoList_Query($id: ID!) {
            ...todolistAll_query @arguments(id: $id)
        }
    `,
    get_variables: (props) => ({id: props.id}),  // TODO: どうやってタイプセーフにする？
    variables: {id: ''},
})
