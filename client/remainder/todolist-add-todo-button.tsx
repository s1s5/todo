import * as React from 'react'
import {graphql, commitMutation, ReactRelayContext} from 'react-relay'

const addTodoMutation = graphql`
    mutation todolistAddTodoButton_Mutation($input: TodoCreateMutationInput!) {
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

export default AddTodoButton
