import * as React from 'react'
import {useRouteMatch, Switch, Route} from "react-router-dom";

import TodoListList from './todolist-list'

// const TodoListPaginated = React.lazy(() => import('./todolist-paginated'))
// const TodoListRefetch = React.lazy(() => import('./todolist-refetch'))
// const TodoListAll = React.lazy(() => import('./todolist-all'))
// const TodoListAll2 = React.lazy(() => import('./todolist-all-2'))
// const TodoListFetchQuery = React.lazy(() => import('./todolist-fetch-query'))
// const TodoListSubscOnly = React.lazy(() => import('./todolist-subsc-only'))

import TodoListPaginated from './todolist-paginated'
import TodoListRefetch from './todolist-refetch'
import TodoListAll from './todolist-all'
// import TodoListAll2 from './todolist-all-2'
import TodoListFetchQuery from './todolist-fetch-query'
import TodoListSubscOnly from './todolist-subsc-only'


const Urls = () => {
    const match = useRouteMatch()
    return (
        <Switch>
          <Route path={`${match.path}/:id/paginated/`}>
            <TodoListPaginated/>
          </Route>
          <Route path={`${match.path}/:id/refetch/`}>
            <TodoListRefetch/>
          </Route>
          <Route path={`${match.path}/:id/fetchquery/`}>
            <TodoListFetchQuery/>
          </Route>
          <Route path={`${match.path}/:id/all/`}>
            <TodoListAll/>
          </Route>
          {/* <Route path={`${match.path}/:id/all2/`}>
              <TodoListAll2/>
              </Route> */}
          <Route path={`${match.path}/:id/subsc/`}>
            <TodoListSubscOnly/>
          </Route>
          <Route path={`${match.path}/hoge/`}>
            <h2>hello hoge</h2>
          </Route>
          <Route exact path={ `${match.path}/` } component={ () => <TodoListList/> }/>
        </Switch>
    )
}

export default Urls


