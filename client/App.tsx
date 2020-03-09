import { hot } from 'react-hot-loader/root'
import * as React from 'react'

import {graphql, QueryRenderer, createFragmentContainer} from 'react-relay';

import Counter from './Counter'
import TodoList from './remainder/TodoList'

import {
    Environment,
    Network,
    RecordSource,
    Store,
    RequestParameters,
    Variables,
    CacheConfig,
    UploadableMap,
} from 'relay-runtime';

function fetchQuery(
    request: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap | null
) {
    return fetch('http://127.0.0.1:42100/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: request.text,
            variables,
        }),
    }).then(response => {
        console.log(response)
        // エラーが起きたときのハンドリングを考える必要がある
        return response.json();
    });
}

import { SubscriptionClient } from 'subscriptions-transport-ws'

class SubscriptionSetupper {
    uri: string
    client: SubscriptionClient | null = null
    constructor(uri: string) {
        this.uri = uri
    }
    
    createClient() {
        this.client = new SubscriptionClient(this.uri, {reconnect: true})
    }
    
    setup = (request: RequestParameters,
             variables: Variables,
             cacheConfig: CacheConfig) => {
                 if (this.client === null) {
                     this.createClient()
                 }
                 const query = request.text!
                 const observable = this.client!.request({query, variables})
                 const d = {
                     subscribe: observable.subscribe,
                     dispose: () => {}
                 }
                 d.dispose = () => {
                     delete d.subscribe
                 }
                 return d
             }
}

const subsc_set_upper = new SubscriptionSetupper('ws://localhost:42100/graphql/')

const environment = new Environment({
  network: Network.create(fetchQuery, subsc_set_upper.setup),
  store: new Store(new RecordSource()),  
});


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
