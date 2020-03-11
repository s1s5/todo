import * as React from 'react'
import {graphql, createFragmentContainer} from 'react-relay'

import {todo_data} from './__generated__/todo_data.graphql'

type Props = {
    data: todo_data,
}

const Todo = (props: Props) => (
    <>{ props.data.id} : { props.data.completed ? "completed" : "yet" } : { props.data.text }</>
)

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

