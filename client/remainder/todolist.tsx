import * as React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';

import {createQueryRenderer} from '../environment'

import {todolist_query} from './__generated__/todolist_query.graphql';

type Props = {
    query: todolist_query,
    todolist_id: string,
}

const TodoList = (props: Props) => {
    return (<div>
      <h3>todo list : { props.query.todolist.id }, { props.query.todolist.title }</h3>
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
