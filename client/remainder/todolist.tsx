import * as React from 'react';

import {graphql, createFragmentContainer} from 'react-relay';
import {todolist_todolist} from './__generated__/todolist_todolist.graphql';

type Props = {
    collapase: boolean,
    todolist: todolist_todolist,
}

const TodoList = (props: Props) => {
    return (<div>
      <h3>todo list : { props.todolist.id }, { props.todolist.title }</h3>
    </div>)
}

export default createFragmentContainer(
    TodoList,
    {
        todolist: graphql`
            fragment todolist_todolist on TodoListNode {
                id
                title
            }
        `
    }
)
