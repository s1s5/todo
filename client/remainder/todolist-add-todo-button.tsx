import * as React from 'react'
import {graphql, commitMutation, RelayContext, ReactRelayContext} from 'react-relay'
import { makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const addTodoMutation = graphql`
    mutation todolistAddTodoButton_Mutation($input: TodoCreateMutationInput!) {
        todoCreate(input: $input) {
            todo {
                id
                completed
                text
            }
            edge {
                cursor
                node {
                    id
                    ...todo_data
                }
            }
        }
    }
`

const AddTodoButton = (props:{todolist__id:string}) => {
    const classes = useStyles()
    return <ReactRelayContext.Consumer>
      {
          (context) => (
              <Fab className={ classes.fab } color="primary" aria-label="add"  onClick={ () => (
                  commitMutation(
                      context!.environment,
                      {
                          mutation: addTodoMutation,
                          variables: {
                              input: {
                                  todolist: props.todolist__id,
                              },
                          },
                          onCompleted: (response: any, errors: any) => {
                              console.log(response)
                          },
                          configs: [{
                              type: 'RANGE_ADD',
                              parentID: props.todolist__id,
                              connectionInfo: [{
                                  key: 'todolist_todoSet',
                                  // rangeBehavior: 'append',
                                  rangeBehavior: 'prepend',
                                  filters: {'orderBy': '-created_at'},
                              }],
                              edgeName: 'edge',
                          }],
                      }
                  ))
              }>
                <AddIcon />
              </Fab>
          )
      }
    </ReactRelayContext.Consumer>
}

export default AddTodoButton
