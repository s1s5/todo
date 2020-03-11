import * as React from 'react'
import {useRouteMatch, Switch, Route} from "react-router-dom";

import TodoListPaginated from './todolist-paginated'
import TodoListAll from './todolist-all'

//          <Link to={`${match.url}/recommend`}>some text</Link>
//          
const TodoList = (props: { todolist_id: string }) => {
    let match = useRouteMatch();
    console.log(match)
    console.log(props)
    return (
        <div>
          <h1>TodoList</h1>
          <Switch>
            <Route path={`${match.path}paginated/`}>
              <TodoListPaginated todolist_id={ props.todolist_id }/>
            </Route>
            <Route path={`${match.path}all/`}>
              <TodoListAll todolist_id={ props.todolist_id }/>
            </Route>
            <Route path={`${match.path}hoge/`}>
              <h2>hello hoge</h2>
            </Route>
            <Route path={`${match.path}`}>
              <h2>default route</h2>
            </Route>
          </Switch>
        </div>)
}

export default TodoList
