import * as React from 'react'

import {graphql, Environment} from 'relay-runtime'
import {QueryRenderer, createFragmentContainer} from 'react-relay'

import {withEnvironment} from '../environment'


type Props = {
    id: string,
    data: any,
}

const AuthorDetail = (props: Props) => {
    return (
        <>
          <h1>author detail</h1>
          <h3>id : { props.id }</h3>
          <h3>name: { props.data.name }</h3>
        </>
    )
}

const AuthorDetailFragment = createFragmentContainer(
    AuthorDetail,
    {
        data: graphql`
            fragment authorDetail_data on AuthorNode {
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
    }
)

const AuthorDetailQuery = (props: {id: string, environment: Environment}) => {
    const props_ = props
    return <QueryRenderer
               environment={ props_.environment }
               query={graphql`
                   query authorDetail_entry_Query($author_id: ID!) {
                       author(id: $author_id) {
                           ...authorDetail_data
                       }
                   }
               `}
               variables={ {author_id: props_.id} }  // TODO: make type safe
               render={ ({error, props, retry}: any) => {
                       if (error) {
                           console.log(error)
                           return <span>{error.toString()}</span>;
                       }
                   // console.log(props);
                       if (props && props.author) {
                           return <AuthorDetailFragment id={ props_.id } data={ props.author } />
                       }
                       return <span>loading</span>
               } }
    />
}

export default withEnvironment(AuthorDetailQuery)
