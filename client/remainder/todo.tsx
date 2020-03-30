import * as React from 'react'
import {graphql, createFragmentContainer} from 'react-relay'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete'

import {todo_data} from './__generated__/todo_data.graphql'
import TodoDelete from './todo-delete'

type Props = {
    data: todo_data,
}

//    <ListItem role={undefined} dense button onClick={ () => {} }>
const Todo = (props: Props) => (
   <ListItem>
      <ListItemIcon>
        <Checkbox
            edge="start"
            checked={ props.data.completed }
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': props.data.id }}
        />
      </ListItemIcon>
      <ListItemText id={ props.data.id } primary={`${props.data.text}`} />
      <ListItemIcon>
        <TodoDelete id={ props.data.id }>{
            (commit: () => void) => (
                <DeleteIcon onClick={ commit } />
            )
        }</TodoDelete>
      </ListItemIcon>
    </ListItem>
)
// { props.data.id} : { props.data.completed ? "completed" : "yet" } : { props.data.text }

export default createFragmentContainer(
    Todo,
    {
        data: graphql`
            fragment todo_data on TodoNode {
                id
                completed
                text
            }
        `,
    }
)

