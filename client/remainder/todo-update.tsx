import * as React from 'react'

import {
    FormControl,
    FormHelperText,
    InputLabel,
    Checkbox,
    Input,
    Button,
} from '@material-ui/core'

const FormContext = React.createContext<any>({});

type MyCheckBoxProps<T> = {
    form_id: string,
    error_message: string | undefined,
    value: T,
    on_change: () => unknown,
}

const MyCheckBox_ = (props:MyCheckBoxProps<boolean>) => (
    <FormControl error={ props.error_message !== undefined }>
      <InputLabel htmlFor={props.form_id}>タスク完了</InputLabel>
      <Checkbox
          id={ props.form_id }
          checked={props.value}
          onChange={props.on_change}
          aria-describedby={ props.form_id + "-help-text" }
      />
      <FormHelperText id={ props.form_id + "-help-text" }>{ `${props.error_message}, ` }Some important helper text</FormHelperText>
    </FormControl>
)


const wrapper = (Compoent: any, on_change: (((event:any, prev:any) => any) | undefined) = undefined) => ( (props: any) => (
    <FormContext.Consumer>
      { (context) => {
            console.log('wrapper -> ', props.name, context.value[props.name])
            return <Compoent
                       form_id={ `${context.form_id}-${props.name}` }
                       value={ context.value[props.name] }
                       error_message={ props.name in context.errors ? context.errors[props.name] : undefined }
                       on_change={ (event:any) => {
                           const {value} = event.target
                           context.set_value( (prev:any) => {
                               const next = {...prev}
                               // next[props.name] = !prev[props.name]
                               // nameのチェックを入れたい, Component作成時に初期値が必ずundefinedじゃないことを保証すればいい？
                               if (on_change === undefined) {
                                   next[props.name] = value
                               } else {
                                   next[props.name] = on_change(value, prev[props.name])
                               }
                               return next
                           })
                       }} />
      }}
    </FormContext.Consumer>    
))

// const MyCheckBox = (props:any) => (
//     <FormContext.Consumer>
//       { (context) => {
//             console.log(props)
//             console.log(context)
//             return <MyCheckBox_
//             form_id={ `${context.form_id}-${props.name}` }
//             has_error={ false }
//             value={ context.value[props.name] }
//           on_change={ () => {
//               console.log('mycheckbox on_change')
//               context.set_value( (prev:any) => {
//                   console.log('old ->', prev)
//                   const next = {...prev}
//                   next[props.name] = !prev[props.name]
//                   console.log('new -> ', next)
//                   return next
//               })
//           }} />
//       }}
//     </FormContext.Consumer>
// )
const MyCheckBox = wrapper(MyCheckBox_, (event, prev) => (!prev))

const MyTextInput_ = (props:MyCheckBoxProps<string>) => (
    <FormControl error={ props.error_message !== undefined }>
      <InputLabel htmlFor={props.form_id}>text</InputLabel>
      <Input id={props.form_id} value={props.value} onChange={props.on_change} />
      <FormHelperText id={ props.form_id + "-help-text" }>{ `${props.error_message}, ` }Some important helper text</FormHelperText>
    </FormControl>
)

const MyTextInput = wrapper(MyTextInput_, (value, prev) => {
    // const {value} = event.target
    /* console.log(event.target)
     * console.log(event.target.value) */
    return value
})


type MyFormGroupProps = {
    value: any,
    set_value: any,
    children: any,
    errors: any,
}

const MyFormGroup = (props: MyFormGroupProps) => {
    console.log('MYFORMGROUP->', props)
    console.log(props.errors)

    // TODO: React.useMemoを使おうとすると怒られる・・・
//     const errors: any = {}
//     props.errors.map((e: any) => {
//         const {field, messages} = e
//         if (errors[field] === undefined) {
//             errors[field] = ''
//         }
//         errors[field] = messages.reduce((a : string, c : string) => (a + c), errors[field])
//     })

    // errors[props.name]の時点でダメだったのか？
    const errors = React.useMemo(() => {
        const d: any = {}
        props.errors.map((e: any) => {
            const {field, messages} = e
            if (d[field] === undefined) {
            d[field] = ''
        }
            d[field] = messages.reduce((a : string, c : string) => (a + c), d[field])
        })
        return d
    }, [props.errors])

    
    console.log(errors)
    return <FormContext.Provider value={ {
        form_id: "hoge",
        value: props.value,
        set_value: props.set_value,
        errors: errors,
    } }>
    { props.children }
      </FormContext.Provider>
}

import {PayloadError} from 'relay-runtime'
import {graphql, commitMutation, RelayContext, ReactRelayContext} from 'react-relay'
import {withEnvironment} from '../environment'
import {todoUpdate_Mutation} from './__generated__/todoUpdate_Mutation.graphql'

const updateTodoMutation = graphql`
    mutation todoUpdate_Mutation($input: TodoUpdateFormMutationInput!) {
        todoUpdateForm(input: $input) {
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


const TodoUpdateForm = (props:{ id: string, environment: any}) => {
    // 初期値をセットしておかないと怒られる
    const [value, set_value] = React.useState<any>({
        id: props.id,
        completed: false,
        text: "my first text",
    });
    const [form_errors, set_form_errors] = React.useState<any[]>([])
    const [errors, set_errors] = React.useState<any[]>([])

    console.log('TodoUpdateForm', value)
    console.log('TodoUpdateForm', errors)
    return (<>
      <MyFormGroup value={ value } set_value={ set_value } errors={ errors }>
        { form_errors.map((e) => (<p>Error: {e}</p>)) }
        <MyCheckBox name="completed" />
        <MyTextInput name="text" />
      </MyFormGroup>
      <div>{
          Object.entries(value).map((value) => (
              <h6 key={ value[0] }>{ value[0] } : { (value as any)[1].toString() }</h6>
          ))
      }</div>
      <Button onClick={() => {
          console.log("commit!!")
          console.log(props.environment)
          commitMutation(
              props.environment,
              {
                  mutation: updateTodoMutation,
                  variables: {input: value},
                  onCompleted: (response: any | null, errors: ReadonlyArray<PayloadError> | null | undefined) => {
                      if (response === null) {
                          return 
                      }
                      const todo_update_form = response.todoUpdateForm
                      if (errors) {
                          set_form_errors(errors.map((e) => e.message))
                          console.log('errors = ', errors.map((e) => e.message))
                      } else if (todo_update_form.todo === null) {
                          if (!todo_update_form.errors) {
                              set_errors([{'messages': 'サーバー内エラーが発生しました'}])
                          } else {
                              set_errors(todo_update_form.errors)
                          }
                      } else {
                          console.log('update completed!!!')
                      }
                      // console.log('repsonse = ', response)
                  },
                  onError: (error: Error) => {
                      set_form_errors(error.errors.map((e) => e.message))
                      console.log('errors = ', error.errors.map((e) => e.message))
                      console.log('update error!!!')
                      console.log('error = ', error)
                      
                  },
              }
          )
      }}>commit</Button>
    </>)
}

export default withEnvironment(TodoUpdateForm)
