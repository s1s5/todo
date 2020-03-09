import * as React from 'react'

import {Environment} from 'relay-runtime';
import {graphql, QueryRenderer, createFragmentContainer} from 'react-relay';

import {Link} from "react-router-dom";

// import {withEnvironment} from '../environment'
// import TodoList from './todolist'
// 
// type Props = {
//     environment: Environment,
// }
// 
// 
// const List = (props: Props) => (
//     <QueryRenderer
//         environment={props.environment}
//         query={graphql`
//             query todolistList_TodoLists_Query {
//                 todolists {
//                     edges {
//                         node {
//                             id
//                             ...todolist_todolist
//                         }
//                     }
//                 }  
//             }
//             `}
//         variables={{}}
//         render={({error, props} : any) => {
//                 if (error) {
//                     console.log(error)
//                     return <div>Error!</div>
//                 }
//                 if (!props) {
//                     return <div>Loading...</div>
//                 }
//                 return (
//                     <ul>
//                       {
//                           props.todolists.edges.map((edge:any) => (
//                               <li key={ edge.node.id }>
//                                 <Link to={ '/' + edge.node.id + '/' }>
//                                   <TodoList todolist={ edge.node } collapase={ true} />
//                                 </Link>
//                               </li>
//                           ))
//                       }
//                     </ul>)
//         }}
//     />
// )
// 
// export default withEnvironment(List)


import {createQueryRenderer} from '../environment'
import {todolistList_query} from './__generated__/todolistList_query.graphql'

type Props = {
    query: todolistList_query
}

const List = (props: Props) => (
    <div>
      {
          props.query.todolists.edges.map((edge:any) => (
              <li key={ edge.node.id }>
                <Link to={ '/' + edge.node.id + '/' }>
                  { edge.node.title }({ edge.node.id })
                </Link>
              </li>
          ))
      }
    </div>
)

const ListFragment = createFragmentContainer(List, {
    // Queryのfragment
    query: graphql`
        fragment todolistList_query on Query {
            todolists {
                edges {
                    node {
                        id
                        title
                    }
                }
            }  
        }`
})

export default createQueryRenderer(ListFragment, List, {
    query: graphql`
        query todolistList_TodoLists_Query {
            ...todolistList_query
        }        
    `,
})
