import * as React from 'react'

import {Environment, PayloadError} from 'relay-runtime'
import {commitMutation} from 'react-relay'

import {withEnvironment} from '../environment'
import FormContext from './form-context'


type Props<T> = {
    id: string,
    initialValue: T,
    mutation: any,
    children: React.ReactNode,
    environment: Environment,
}

const Form = <T extends Object>(props: Props<T>) => {
    const [value, set_value] = React.useState(props.initialValue)
    const [form_errors, set_form_errors] = React.useState<any[]>([])
    const [errors, set_errors_] = React.useState<any[]>([])

    const set_errors = (errors_: ReadonlyArray<{
        readonly field: string;
        readonly messages: ReadonlyArray<string>;
    } | null> | null) => {
        const d: any = {}
        if (errors_) {
            errors_.map((e: any) => {
                const {field, messages} = e
                if (d[field] === undefined) {
                    d[field] = ''
                }
                d[field] = messages.reduce((a : string, c : string) => (a + c), d[field])
            })
        }
        set_errors_(d)
    }

    const commit_with_value = React.useCallback((value_) => {
        commitMutation(
            props.environment,
            {
                mutation: props.mutation,
                variables: value_,
                onCompleted: (response: any | null, errors: ReadonlyArray<PayloadError> | null | undefined) => {
                    if (response === null) {
                        return 
                    }
                    const todo_update_form = response.todoUpdateForm
                    if (errors) {
                        set_form_errors(errors.map((e) => e.message))
                        console.log('errors = ', errors.map((e) => e.message))
                    } else if (todo_update_form.todo == null) {
                        console.log('errors = ', todo_update_form.errors)
                        if (todo_update_form.errors == null) {
                            set_form_errors([{'messages': 'サーバー内エラーが発生しました'}])
                        } else {
                            set_errors(todo_update_form.errors)
                        }
                    } else {
                        console.log('update completed!!!')
                    }
                    // console.log('repsonse = ', response)
                },
                onError: (error: any) => {
                    set_form_errors(error.errors.map((e: any) => e.message))
                    console.log('errors = ', error.errors.map((e:any) => e.message))
                    console.log('update error!!!')
                    console.log('error = ', error)
                    
                },
            }
        )
    }, [props.environment, props.mutation])

    const commit = React.useCallback(() => commit_with_value(value), [value, commit_with_value])
    
    return (
        <FormContext.Provider value={ {
            formBaseId: props.id,
            value: value,
            setValue: set_value,
            formErrors: form_errors,
            errors: errors,
            commit,
        } }>
        { props.children }
        </FormContext.Provider>
    )
}

export default withEnvironment(Form)
