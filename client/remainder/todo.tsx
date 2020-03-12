import * as React from 'react'
import {graphql, createFragmentContainer} from 'react-relay'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import {todo_data} from './__generated__/todo_data.graphql'

type Props = {
    data: todo_data,
}

const Todo = (props: Props) => (
    <ListItem role={undefined} dense button onClick={ () => {} }>
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

