import * as React from 'react'

import { Link } from "react-router-dom";

import {createAuthorDetailQuery_data as DataType} from './__generated__/createAuthorDetailQuery_data.graphql'
import createAuthorDetailQuery from './create-author-detail-query'


type Props = {
    data: DataType,
}

const AuthorDetail = (props: Props) => {
    return (
        <>
          <h1>author detail (<Link to={ `/shelf/author/${ props.data.id }/update/` }>edit</Link>)</h1>
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

export default createAuthorDetailQuery(AuthorDetail)
