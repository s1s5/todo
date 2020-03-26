import * as React from 'react'

import {IEnvironment, PayloadError, GraphQLTaggedNode} from 'relay-runtime'
import {ReactRelayContext, commitMutation} from 'react-relay'

import {withEnvironment} from '../environment'
import FormContext from './form-context'


type Props<T> = {
    id: string,
    initialVariables: T,
    mutation: GraphQLTaggedNode,
    children: React.ReactNode,
    environment: IEnvironment,
}

// !!! mutationは以下のような感じで
// !!! inputはmutationの名前「todoUpdateForm」 + 「Input」である必要がある。
// !!! errorは「errors」に返ってこないとだめ
// !!! todoUpdateFormの前に「xx: 」とかかけばaliasにすることができる。この場合mutationの名前が「xx」になる
// graphql`
//     mutation todoUpdate_Mutation($todoUpdateFormInput: TodoUpdateFormMutationInput!) {
//         todoUpdateForm(input: $todoUpdateFormInput) {
//             errors {
//                 field
//                 messages
//             }
//             todo {
//                 id
//                 completed
//                 text
//             }
//         }
//     }
// `

const Form = <T extends Object>(props: Props<T>) => {
    const [value, set_value] = React.useState(props.initialVariables)
    const [form_errors, set_form_errors] = React.useState<any[]>([])
    const [errors, set_errors] = React.useState<any>([])

//    const set_errors = (errors_: ReadonlyArray<{
//        readonly field: string;
//        readonly messages: ReadonlyArray<string>;
//    } | null> | null) => {
//        const d: any = {}
//        if (errors_) {
//            errors_.map((e: any) => {
//                const {field, messages} = e
//                if (d[field] === undefined) {
//                    d[field] = ''
//                }
//                d[field] = messages.reduce((a : string, c : string) => (a + c), d[field])
//            })
//        }
//        set_errors_(d)
//    }

    const commit_with_value = React.useCallback((value_, on_success, on_failure) => {
        commitMutation(
            props.environment,
            {
                mutation: props.mutation,
                variables: value_,
                onCompleted: (response: any | null, errors: ReadonlyArray<PayloadError> | null | undefined) => {
                    if (response === null) {
                        return 
                    }
                    if (errors) {
                        set_form_errors(errors.map((e) => e.message))
                        return
                    }

                    let has_error = false
                    for (let form in response) {
                        if ('errors' in response[form] && (!(response[form].errors == null)) && response[form].errors.length > 0) {
                            has_error = true
                        }
                    }
                    if (has_error) {
                        set_errors(response)
                        on_failure && on_failure(response)
                    } else {
                        on_success && on_success(response)
                    }

//                    const todo_update_form = response.todoUpdateForm
//                    if (errors) {
//                        set_form_errors(errors.map((e) => e.message))
//                        console.log('errors = ', errors.map((e) => e.message))
//                    } else if (todo_update_form.todo == null) {
//                        console.log('errors = ', todo_update_form.errors)
//                        if (todo_update_form.errors == null) {
//                            set_form_errors([{'messages': 'サーバー内エラーが発生しました'}])
//                        } else {
//                            set_errors(todo_update_form.errors)
//                        }
//                    } else {
//                        console.log('update completed!!!')
//                    }
                    // console.log('repsonse = ', response)
                },
                onError: (error: any) => {
                    set_form_errors(error.errors.map((e: any) => e.message))
                    // console.log('errors = ', error.errors.map((e:any) => e.message))
                    // console.log('update error!!!')
                    // console.log('error = ', error)
                },
            }
        )
    }, [props.environment, props.mutation])

    const commit = React.useCallback((on_success?, on_failure?) => commit_with_value(value, on_success, on_failure), [value, commit_with_value])
    
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
// export default withEnvironment(Form)


const FormWithEnv = <T extends Object>(props: Omit<Props<T>, 'environment'>) => (
    <ReactRelayContext.Consumer>
      {(context) =>
          <Form<T> environment={ context!.environment } {...props} />
      }
    </ReactRelayContext.Consumer>
)

export default FormWithEnv
