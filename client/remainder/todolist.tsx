import * as React from 'react'
import {useRouteMatch, Switch, Route} from "react-router-dom";

import TodoListPaginated from './todolist-paginated'
import TodoListAll from './todolist-all'

//          <Link to={`${match.url}/recommend`}>some text</Link>
//          
const TodoList = (props: { id: string }) => {
    let match = useRouteMatch();
    return (
        <div>
          <h1>TodoList</h1>
          <Switch>
            <Route path={`${match.path}paginated/`}>
              <TodoListPaginated id={ props.id }/>
            </Route>
            <Route path={`${match.path}all/`}>
              <TodoListAll id={ props.id }/>
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
