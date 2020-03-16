import * as React from 'react'
import {graphql, commitMutation, RelayContext, ReactRelayContext} from 'react-relay'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

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
          (context:RelayContext | null) => (
              <Fab color="primary" aria-label="add"  onClick={ () => (
                  commitMutation(
                      context!.environment,
                      {
                          mutation: addTodoMutation,
                          variables: {
                              input: {todolist: props.todolist__id},
                          },
                      }
                  ))
              }>
                <AddIcon />
              </Fab>
          )
      }
    </ReactRelayContext.Consumer>
)

export default AddTodoButton
