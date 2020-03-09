import { hot } from 'react-hot-loader/root'
import * as React from 'react'

import {ReactRelayContext} from 'react-relay';

import {createEnvironment} from './environment/index'
const environment = createEnvironment('http://127.0.0.1:42100/graphql/', 'ws://localhost:42100/graphql/')
import TodoListList from './remainder/todolist-list'

const App = () => (
  <div>
    <ReactRelayContext.Provider value={ {environment} }>
      <h1>Hello, world.</h1>
      <ReactRelayContext.Consumer>
        {({ environment }) => {
             console.log(environment)
             return <div>environment = { environment === undefined ? "undefined" : "some value" }</div>
        }}
      </ReactRelayContext.Consumer>
      <TodoListList/>
    </ReactRelayContext.Provider>
  </div>
)

export default hot(App)
