

import React from 'react'
// import {graphql} from 'babel-plugin-relay/macro'
// import {QueryRenderer} from 'react-relay'
import {graphql, QueryRenderer} from 'react-relay'
import { create, act } from 'react-test-renderer'
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'

import Todo from '../todo'

let environment: ReturnType<typeof createMockEnvironment>

beforeEach(() => {
    environment = createMockEnvironment()
})

const TestRenderer = () => (
    <QueryRenderer
    environment={environment}
    query={ graphql`
      query todoTest_test_Query @relay_test_operation {
          todolist(id: "test-id") {
              id
              todoSet {
                  edges {
                      node {
                          ...todo_data
                      }
                  }
              }
          }
      }
    `}
    variables={ {} }
        render={({error, props}: {error:any, props:any}) => {
            console.log(error, props)
        if (error) {
            return <span>Error</span>;
        }
            if (props) {
                console.log(props.todolist.todoSet.edges)
            return <Todo data={ props.todolist.todoSet.edges[0].node } />
        }
        return <span>loading</span>
    }}
    />
)

it('show data', () => {
    const wrapper = create(<TestRenderer />);

    /* environment.mock.resolveMostRecentOperation(operation =>
     *     MockPayloadGenerator.generate(operation, {
     *         
     *     })
     * ) */
    environment.mock.resolveMostRecentOperation((operation:any) =>
        MockPayloadGenerator.generate(operation, {
            ID(_, generate_id) {
                return `id-${generate_id()}`
            },
            TodoNode: () => ({
                completed: false,
                text: "hoge",
            }),
            TodoNodeConnection: () => ({
                edges: [{
                    node: {
                    }
                }]
            }),
        })
    )
    
    /* const tree = renderer
     *     .create(<Link url="http://www.hogehoge.com">Facebook</Link>)
     *     .toJSON(); */
    // expect(wrapper.toJSON()).toMatchSnapshot();
    expect(wrapper).toMatchSnapshot();
})
