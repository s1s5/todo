import * as React from 'react'

import {graphql, Environment, getDataIDsFromFragment, } from 'relay-runtime'
import {QueryRenderer, createFragmentContainer} from 'react-relay'
import { useParams } from "react-router-dom";

import {withEnvironment} from '../environment'

import {authorDetail_data as DataType} from './__generated__/authorDetail_data.graphql'
import authorDetail_node from './__generated__/authorDetail_data.graphql'


type Props = {
    data: DataType,
}

const AuthorDetail = (props: Props) => {
    return (
        <>
          <h1>author detail</h1>
          <h3>id : { props.data.id }</h3>
          <h3>name: { props.data.name }</h3>
          <h3>released books</h3>
          {
              props.data.bookSet.edges.map(edge => edge && edge.node && (
                  <p key={ edge.node.id } >title: {edge.node.title}</p>
              ))
          }
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

const AuthorDetailQuery = (props: {id?: string, environment: Environment}) => {
    let id:string
    if (props.id == null) {
        const params:any = useParams();
        console.log(params)
        id = params.id
    } else {
        id = props.id
    }
    console.log(id)
    const props_ = props
    const store = props.environment.getStore() // Store
    console.log(store)
    const author = store.getSource().get(id)  // RecordSource -> Record
    console.log('author : ', author)
//     const fragment = store.lookup({
// //    readonly kind: string;
// //    readonly dataID: DataID;
// //    readonly node: ReaderFragment;
// //    readonly owner: RequestDescriptor;
// //    readonly variables: Variables;
//         kind: "ScalarField",
//         dataID: "",
//         node: authorDetail_node,
//     })
//     console.log('fragment : ', fragment)
    return <QueryRenderer
               environment={ props_.environment }
               query={graphql`
                   query authorDetail_entry_Query($author_id: ID!) {
                       author(id: $author_id) {
                           ...authorDetail_data
                       }
                   }
               `}
               variables={ {author_id: id} }  // TODO: make type safe
               render={ ({error, props, retry}: any) => {
                       if (error) {
                           console.log("error: ", error)
                           return <span>{error.map((e:any) => e.message)}</span>;
                       }
                   // console.log(props);
                       if (props && props.author) {
                           console.log("show fragment", props.author)
                           console.log("show fragment", props.author.__fragmentOwner)
                           console.log("show fragment", props.author.__fragments)
                           const a: any = {}
                           // a.__fragmentOwner = props.author.__fragmentOwner
                           a.__fragmentOwner = {
                               // node: {},
                               // variables: {},
                           }
                           a.__fragments = {authorDetail_data: {}}
                           a.__id = props.author.__id
                           // console.log("show fragment", getDataIDsFromFragment(props.author, []))
                           return <AuthorDetailFragment data={ a } />
                       }
                       console.log("show loading")
                   //if (author) {
                   //        const a: any = {}
                   //        a.__fragmentOwner = {}
                   //    a.__fragments = {authorDetail_data: {}}
                   //    a.__id = props_.id
                   //    return <AuthorDetailFragment data={ a } />
                   //} else {
                       return <span>loading author information</span>
                   //}
               } }
    fetchPolicy='store-and-network'
    cacheConfig={ {
                                force: false, // causes a query to be issued unconditionally, irrespective of the state of any configured response cache.
        // poll: 5 * 60 * 1000, // causes a query to live update by polling at the specified interval in milliseconds
                        } }
    />
}

export default withEnvironment(AuthorDetailQuery)
