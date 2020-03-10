import * as React from 'react'
import {graphql, createFragmentContainer} from 'react-relay'

import {todo_todo} from './__generated__/todo_todo.graphql'

type Props = {
    todo: todo_todo,
}

const Todo = (props: Props) => (
    <>{ props.todo.id} : { props.todo.completed } : { props.todo.text }</>
)

export default createFragmentContainer(
    Todo,
    {
        todo: graphql`
            fragment todo_todo on TodoNode {
                id
                completed
                text
            }
        `,
    }
)

