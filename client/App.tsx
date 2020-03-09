import { hot } from 'react-hot-loader/root'
import * as React from 'react'

import {graphql, QueryRenderer} from 'react-relay';

import Counter from './Counter'
import TodoList from './remainder/TodoList'

import createEnvironment from './environment/index'
const environment = createEnvironment('http://127.0.0.1:42100/graphql/', 'ws://localhost:42100/graphql/')

const App = () => (
  <div>
    <h1>Hello, world.</h1>
    <Counter/>
      <QueryRenderer
      environment={environment}
      query={graphql`
          query App_TodoLists_Query {
              todolists {
                  edges {
                      node {
                          id
                          ...TodoList_todolist
                      }
                  }
              }  
          }
          `}
      variables={{}}
      render={({error, props} : any) => {
              if (error) {
                  console.log(error)
                  return <div>Error!</div>
              }
              if (!props) {
                  return <div>Loading...</div>
              }
              console.log(props)
              return (
                  <div>
                    {
                        props.todolists.edges.map((edge:any) => (
                            <TodoList key={ edge.node.id } todolist={ edge.node } />
                        ))
                    }
                  </div>)
      }}
      />
  </div>
)

export default hot(App)
