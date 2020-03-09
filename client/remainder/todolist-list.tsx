import * as React from 'react'

import {graphql, createFragmentContainer} from 'react-relay';

import {Link} from "react-router-dom";

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
