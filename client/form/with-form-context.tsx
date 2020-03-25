import * as React from 'react'
import _ from 'lodash'

import FormContext from './form-context'

type Props<T> = {
    formId: string,
    value: T,
    errorMessage: any,
    onChange: any,
}

const ContextWrapper = (props:any) => {
    const {Component, context, onChange, ...other_props} = props
    const _on_change = React.useCallback((new_value:any) => {
        context.setValue( (prev:any) => {
            const next = _.cloneDeep(prev)
            // next[props.name] = !prev[props.name]
            // nameのチェックを入れたい, Component作成時に初期値が必ずundefinedじゃないことを保証すればいい？
            if (onChange === undefined) {
                next[context!.formGroupId!][props.name] = new_value
            } else {
                next[context!.formGroupId!][props.name] = onChange(new_value, prev[context!.formGroupId!][props.name])
            }
            console.log(prev)
            console.log(next)
            return next
        })
    }, [context.setValue, context.formGroupId, props.name])
    // console.log(other_props)
    return <Component
               onChange={ _on_change }
               {...other_props} />
}


const withFormContext = (Component: any, on_change: (((event:any, prev:any) => any) | undefined) = undefined) =>  ( (props: any) => {
    return <FormContext.Consumer>
      { (context) => {
            // console.log('wrapper -> ', props.name, context.value[props.name])
            return <ContextWrapper
                       Component={Component}
                       context={context}
                       formId={ `${context!.formBaseId}-${context!.formGroupId!}-${props.name}` }
                       value={ context!.value[context!.formGroupId!][props.name] }
                       errorMessage={ props.name in context!.errors ? context!.errors[props.name] : undefined }
                       onChange={ on_change }
                       { ...props } />
      }}
    </FormContext.Consumer>
})

export {
    Props,
}
export default withFormContext
