 import * as React from 'react'

import {graphql, createFragmentContainer} from 'react-relay'
import {createQueryRenderer} from '../environment'

import {Route, Link, useRouteMatch, match as Match} from "react-router-dom";

import {authors_query as QueryType} from "./__generated__/authors_query.graphql"

import AuthorCreate from './author-create'
import AuthorDetail from './author-detail'

type Props = {
    query: QueryType,
}

const Authors = (props: Props) => {
    const match = useRouteMatch()
    const author_map = React.useMemo(() => {
        const m:any = {}
        if (props.query.authors && props.query.authors) {
            props.query.authors.edges.map(edge => edge && edge.node && (
                m[edge.node.id] = edge.node
            ))
        }
        return m
    }, [props.query])
    console.log(`${match.path} , ${match.url}`)
    //  data={ author_map[match.params.id] 
    return (
        <>
          <Route exact path={ `${match.path}/create/` } component={ () => <AuthorCreate /> }/>
          <Route path={ `${match.path}/:id` } component={ ({match}:any) => <AuthorDetail id={match.params.id} />} />
          <Route exact path={ `${match.path}/` } component={ () => (
              <>
                <h1>authors</h1>
                <Link to={ `${match.path}/create/` }>
                  create-author
                </Link>
                <ul>
                  {
                      props.query.authors && props.query.authors &&
                      props.query.authors.edges.map(edge => edge && edge.node && (
                          <li key={ edge.node.id }>
                            { edge.node.name } ({
                                edge.node.bookSet.edges.map(edge => edge && edge.node && (
                                    <>{edge.node.title}, </>
                                ))
                            })
                            <Link to={ `${match.path}/${ edge.node.id }/` }>
                              detail
                            </Link>
                          </li>
                      ))
                  }
                </ul>
              </>
          ) }/>
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
                            ...authorDetail_data
                        }
                    }
                }
            }
        `
    }
)

export default createQueryRenderer(AuthorsFragment, Authors, {
    query: graphql`
        query authors_entry_Query {
            ...authors_query
        }
    `,
    variables: {},
})
