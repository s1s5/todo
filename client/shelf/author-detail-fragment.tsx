import * as React from 'react'
import {
    graphql,
    GraphQLTaggedNode,
    RelayContext,
} from 'relay-runtime'

import {
    ReactRelayContext,
    QueryRenderer,
    createFragmentContainer
} from 'react-relay'

import { useParams } from "react-router-dom";


//const fragment:GraphQLTaggedNode = graphql`
//            fragment authorDetailFragment_data on AuthorNode {
//                id
//                name
//                bookSet {
//                    edges {
//                        node {
//                            id
//                            title
//                        }
//                    }
//                }
//            }
//        `

const AuthorDetailQuery = <P extends object>(Component: React.ComponentType<P>): React.FC<Omit<P, "data"> & {id?: string}> => {

    const FragmentContainer:any = createFragmentContainer(Component, {
        data: graphql`
            fragment authorDetailFragment_data on AuthorNode {
                id
                name
                bookSet {
                    edges {
                        node {
                            id
                            title
                        }
                    }
                }
            }
        `
    })

    return (props: Omit<P, "data"> & {id?: string}) => {
        let id = props.id
        if (id == null) {
            const params:any = useParams();
            id = params.id
        }
        return (
            <ReactRelayContext.Consumer>
              {(context:RelayContext | null) => (
                  <QueryRenderer
                      environment={ context!.environment }
                      query={graphql`
                          query authorDetailFragment_entry_Query($author_id: ID!) {
                              author(id: $author_id) {
                                  ...authorDetailFragment_data
                              }
                          }
                          `}
                      variables={ {author_id: id} }
                      render={ ({error, props, retry}: any) => {
                              if (error) {
                                  console.log("error: ", error)
                                  return <span>{error.map((e:any) => e.message)}</span>;
                              }
                              if (props && props.author) {
                                  return <FragmentContainer data={ props.author } />
                              }
                              return <span>loading author information</span>
                      } }
                      fetchPolicy='store-and-network'
                      cacheConfig={ {
                              force: false, // causes a query to be issued unconditionally, irrespective of the state of any configured response cache.
                              poll: 5 * 60 * 1000, // causes a query to live update by polling at the specified interval in milliseconds
                      } }
                  />
              )}
            </ReactRelayContext.Consumer>
        )
    }
}

export default AuthorDetailQuery
