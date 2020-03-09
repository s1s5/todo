import * as React from 'react'

import {Environment} from 'relay-runtime';

import {graphql, QueryRenderer} from 'react-relay';

import {withEnvironment} from '../environment/index'

type Props = {
    environment: Environment,
}

const List = (props: Props) => (
    <QueryRenderer
        environment={props.environment}
        query={graphql`
            query todolistList_TodoLists_Query {
                todolists {
                    edges {
                        node {
                            id
                            title
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
                return (
                    <div>
                      {
                          props.todolists.edges.map((edge:any) => (
                              <h2 key={ edge.node.id }>todo list : { edge.node.id }, { edge.node.title }</h2>
                          ))
                      }
                    </div>)
        }}
    />
)

export default withEnvironment(List)
