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
} from '../gql-utils'


const MyTextInput_ = React.memo((props: FormProps<string>) => (
    <FormControl error={ props.errors !== undefined }>
      <InputLabel htmlFor={props.formId}>名前を入れてください</InputLabel>
      <Input id={props.formId} value={props.value} onChange={ (e) => props.onChange(e.target.value) } />
      { props.errors && <FormHelperText id={ props.formId + "-help-text" }>{ `${props.errors}, ` }</FormHelperText> }
    </FormControl>
))

const MyTextInput = withFormContext(MyTextInput_)

const author_create_mutation = graphql`
    mutation authorCreate_Mutation($authorCreateInput: AuthorCreateInput!) {
        authorCreate(input: $authorCreateInput) {
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

const AuthorCreate = () => {
    const history = useHistory()
    const variables = {
        authorCreateInput : {
            name: "",
        }
    }
    return (
        <Form id="hoge" initialVariables={ variables } mutation={ author_create_mutation }>
          <h3>create author</h3>
          <FormGroup name="authorCreate">
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

export default AuthorCreate
