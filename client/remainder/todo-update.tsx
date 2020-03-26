import * as React from 'react'

import {
    FormControl,
    FormHelperText,
    InputLabel,
    Checkbox,
    Input,
    Button,
    FormControlLabel,
} from '@material-ui/core'

import {
    Form, FormGroup, withFormContext, FormProps, CommitTrigger,
} from '../form'

const MyCheckBox_ = React.memo((props: FormProps<boolean>) => {
    console.log('my checkbox rendered, ->', props.value, props.errors)
    return (
        <FormControl error={ props.errors !== undefined }>
        <FormControlLabel
        control={
            <Checkbox
                id={ props.formId }
                checked={props.value}
                onChange={(e) => props.onChange(e.target.checked)}
                aria-describedby={ props.formId + "-help-text" }
                color="primary"
            />
        }
        label="タスク完了"
        labelPlacement="end"/>
        <FormHelperText id={ props.formId + "-help-text" }>{ props.errors && `${props.errors}, ` }Some important helper text</FormHelperText>
    </FormControl>
    )
})
const MyCheckBox = withFormContext(MyCheckBox_)

const MyTextInput_ = React.memo((props: FormProps<string>) => (
    <FormControl error={ props.errors !== undefined }>
      <InputLabel htmlFor={props.formId}>text</InputLabel>
      <Input id={props.formId} value={props.value} onChange={ (e) => props.onChange(e.target.value) } />
      <FormHelperText id={ props.formId + "-help-text" }>{ props.errors && `${props.errors}, ` }Some important helper text</FormHelperText>
    </FormControl>
))

const MyTextInput = withFormContext(MyTextInput_)

import { graphql } from 'react-relay'
import { todoUpdate_Mutation } from './__generated__/todoUpdate_Mutation.graphql'

const updateTodoMutation = graphql`
    mutation todoUpdate_Mutation($todoUpdateFormInput: TodoUpdateFormMutationInput!) {
        todoUpdateForm(input: $todoUpdateFormInput) {
            errors {
                field
                messages
            }
            todo {
                id
                completed
                text
            }
        }
    }
`


const TodoUpdateForm = (props:{ id: string }) => {
    // 初期値をセットしておかないと怒られる
    const [value, set_value] = React.useState<todoUpdate_Mutation["variables"]>({
        todoUpdateFormInput: { 
            id: props.id,
            completed: false,
            text: "test-036",
        },
    })
    // const [form_errors, set_form_errors] = React.useState<any[]>([])
    // const [errors, set_errors] = React.useState<any[]>([])

    // console.log('TodoUpdateForm', value)
    // console.log('TodoUpdateForm', errors)
    return (
        <Form<todoUpdate_Mutation["variables"]> id="hoge" initialVariables={ value } mutation={ updateTodoMutation }>
          <FormGroup name="todoUpdateForm">
            {/* { form_errors.map((e) => (<p>Error: {e}</p>)) } */}
            <MyCheckBox name="completed" />
            <MyTextInput name="text" />
          </FormGroup>
          <div>{
              Object.entries(value).map((value) => (
                  <h6 key={ value[0] }>{ value[0] } : { (value as any)[1].toString() }</h6>
              ))
          }</div>
          <CommitTrigger<todoUpdate_Mutation["response"]>
              onSuccess={ () => console.log('success!!') }
              onFailure={ () => console.log('failed...') }
          >
            { (commit) => (
                <Button onClick={ () => commit() } >commit</Button>
            )}
          </CommitTrigger>
        </Form>
    )
}

export default TodoUpdateForm
