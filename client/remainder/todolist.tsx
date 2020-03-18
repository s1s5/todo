import * as React from 'react'
import {useRouteMatch, Switch, Route} from "react-router-dom";

// import TodoListPaginated from './todolist-paginated'
// import TodoListRefetch from './todolist-refetch'
// import TodoListAll from './todolist-all'
// import TodoListFetchQuery from './todolist-fetch-query'


const TodoListPaginated = React.lazy(() => import('./todolist-paginated'))
const TodoListRefetch = React.lazy(() => import('./todolist-refetch'))
const TodoListAll = React.lazy(() => import('./todolist-all'))
const TodoListFetchQuery = React.lazy(() => import('./todolist-fetch-query'))

//          <Link to={`${match.url}/recommend`}>some text</Link>
//          
const TodoList = (props: { id: string }) => {
    let match = useRouteMatch();
    return (
        <div>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path={`${match.path}paginated/`}>
                <TodoListPaginated id={ props.id }/>
              </Route>
              <Route path={`${match.path}refetch/`}>
                <TodoListRefetch id={props.id}/>
              </Route>
              <Route path={`${match.path}fetchquery/`}>
                <TodoListFetchQuery id={props.id}/>
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
          </React.Suspense>
        </div>)
}

export default TodoList
