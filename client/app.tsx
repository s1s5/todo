import { hot } from 'react-hot-loader/root'
import * as React from 'react'

import {ReactRelayContext} from 'react-relay';

import {createEnvironment} from './environment/index'
const environment = createEnvironment('http://127.0.0.1:42100/graphql/', 'ws://localhost:42100/graphql/')

import TodoList from './remainder/todolist'
import TodoListList from './remainder/todolist-list'

import {BrowserRouter as Router, Route} from "react-router-dom";

const App = () => (
  <div>
    <ReactRelayContext.Provider value={ {environment} }>
      <h1>Hello, world.</h1>
      <Router>
        <Route path='/' exact component={ () => <TodoListList/> }/>
      </Router>
    </ReactRelayContext.Provider>
  </div>
)
/* <Route path='/:id([A-Za-z0-9_=]+)/' exact component={ ({matches}:any) => <TodoList todolist={{id: matches.id, title: ""}}/> }/>
 */
export default hot(App)
