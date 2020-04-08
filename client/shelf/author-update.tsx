import * as React from 'react'

import { graphql } from 'relay-runtime'
import { useHistory } from "react-router-dom";

import {
    FormControl,
    FormHelperText,
    InputLabel,
    Input,
    Button,
} from '@material-ui/core'

import {
    Form, FormGroup, withFormContext, FormProps, CommitTrigger,
} from '../form'

import {createAuthorDetailQuery_data as DataType} from './__generated__/createAuthorDetailQuery_data.graphql'
import createAuthorDetailQuery from './create-author-detail-query'

const MyTextInput_ = React.memo((props: FormProps<string>) => (
    <FormControl error={ props.errors !== undefined }>
      <InputLabel htmlFor={props.formId}>名前を入れてください</InputLabel>
      <Input id={props.formId} value={props.value} onChange={ (e) => props.onChange(e.target.value) } />
      { props.errors && <FormHelperText id={ props.formId + "-help-text" }>{ `${props.errors}, ` }</FormHelperText> }
    </FormControl>
))

const MyTextInput = withFormContext(MyTextInput_)

const author_update_mutation = graphql`
    mutation authorUpdate_Mutation($authorUpdateInput: AuthorUpdateInput!) {
        authorUpdate(input: $authorUpdateInput) {
            errors {
                field
                messages
            }
            author {
                id
                name
            }
        }
    }`

type Props = {
    data: DataType,
}

const AuthorUpdate = (props: Props) => {
    const history = useHistory()
    const variables = {
        authorUpdateInput : {
            id: props.data.id,
            name: props.data.name,
        }
    }
    return (
        <Form id={ props.data.id } initialVariables={ variables } mutation={ author_update_mutation }>
          <h3>update author</h3>
          <FormGroup name="authorUpdate">
            <MyTextInput name="name" />
          </FormGroup>
          <CommitTrigger
              onSuccess={ history.goBack }
              onFailure={ () => console.log('failed...') }
          >
            { (commit) => (
                <Button onClick={ () => commit() } >commit</Button>
            )}
          </CommitTrigger>
        </Form>
    )
}

export default createAuthorDetailQuery(AuthorUpdate)
