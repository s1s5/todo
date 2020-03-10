import * as React from 'react'
import {graphql, createFragmentContainer, commitMutation, ReactRelayContext} from 'react-relay'

import {createQueryRenderer} from '../environment'

import Todo from './todo'
import {todolist_query} from './__generated__/todolist_query.graphql'

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
    query: todolist_query,
    todolist_id: string,
}

const TodoList = (props: Props) => {
    return (<div>
      <h3>todo list : { props.query.todolist.id }, { props.query.todolist.title }</h3>
      { props.query.todolist.todoSet.edges.map((edge) => (
          <div key={ edge.node.id }><Todo todo={ edge.node }/></div>
          ))}
      <AddTodoButton todolist__id={ props.query.todolist.id } />
    </div>)
}

const TodoListFragment = createFragmentContainer(
    TodoList,
    {
        query: graphql`
            fragment todolist_query on Query @argumentDefinitions(
                id: {type: "ID!"},
            ) {
                todolist(id: $id) {
                    id
                    title
                    todoSet {
                        edges {
                            node {
                                id
                                ...todo_todo
                            }
                        }
                    }
                }
            }
        `
    }
)

export default createQueryRenderer(TodoListFragment, TodoList, {
    query: graphql`
        query todolist_TodoList_Query($id: ID!) {
            ...todolist_query @arguments(id: $id)
        }
    `,
    get_variables: (props:any) => ({id: props.todolist_id})
})
