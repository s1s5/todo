import * as React from 'react'

import {graphql, Environment, getDataIDsFromFragment, } from 'relay-runtime'
import {QueryRenderer, createFragmentContainer} from 'react-relay'

import {withEnvironment} from '../environment'

import {authorDetail_data as DataType} from './__generated__/authorDetail_data.graphql'
import authorDetail_node from './__generated__/authorDetail_data.graphql'


type Props = {
    id: string,
    data: DataType,
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
    const store = props.environment.getStore() // Store
    console.log(store)
    const author = store.getSource().get(props.id)  // RecordSource -> Record
    console.log('author : ', author)
    const fragment = store.lookup({
//    readonly kind: string;
//    readonly dataID: DataID;
//    readonly node: ReaderFragment;
//    readonly owner: RequestDescriptor;
//    readonly variables: Variables;
        kind: "ScalarField",
        dataID: "",
        node: authorDetail_node,
    })
    console.log('fragment : ', fragment)
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
                           console.log("error: ", error)
                           return <span>{error.map((e:any) => e.message)}</span>;
                       }
                   // console.log(props);
                       if (props && props.author) {
                           console.log("show fragment", props.author)
                           console.log("show fragment", getDataIDsFromFragment(props.author, []))
                           return <AuthorDetailFragment id={ props_.id } data={ props.author } />
                       }
                       console.log("show loading")
                       return <span>loading</span>
               } }
    />
}

export default withEnvironment(AuthorDetailQuery)
