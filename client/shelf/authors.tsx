 import * as React from 'react'

import {graphql, createFragmentContainer} from 'react-relay'
import {DefaultQueryRenderer} from '../gql-utils'

import {Link, useRouteMatch} from "react-router-dom";

import {authors_query as QueryType} from "./__generated__/authors_query.graphql"


type Props = {
    query: QueryType,
}

const Authors = (props: Props) => {
    const match = useRouteMatch()

    return (
        <>
        <h1>authors</h1>
        <Link to={ `${match.path}create/` }>
          create-author
        </Link>
        <ul>
          {
              props.query.authors && props.query.authors &&
                      props.query.authors.edges.map(edge => edge && edge.node && (
                          <li key={ edge.node.id }>
                            { edge.node.name } ({
                                edge.node.bookSet.edges.map(edge => edge && edge.node && (
                                    <span key={ edge.node.id } >{edge.node.title}, </span>
                                ))
                            })
                            <Link to={ `${match.path}${ edge.node.id }/` }>
                              detail
                            </Link>
                          </li>
                      ))
          }
        </ul>
        </>
    )
}

const AuthorsFragment = createFragmentContainer(
    Authors,
    {
        query: graphql`
            fragment authors_query on Query {
                authors {
                    edges {
                        node {
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
                    }
                }
            }
        `
    }
)

const AuthorsQuery = () => (
        <DefaultQueryRenderer
    query={graphql`
        query authors_entry_Query {
            ...authors_query
        }
    `}
    variables={ {} }
    render={ ({error, props, retry}: any) => {
        if (error) {
            console.log("error: ", error)
            return <span>{error.map((e:any) => e.message)}</span>;
        }
        if (props) {
            return <AuthorsFragment query={ props } />
        }
        return <span>loading author information</span>
    } }      
    />
)

export default AuthorsQuery
