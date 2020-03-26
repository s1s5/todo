import * as React from 'react'
import _ from 'lodash'

import FormContext from './form-context'

type Props<T> = {
    formId: string,
    value: T,
    errors: readonly string [],
    onChange: (value: T) => void,
}

const ContextWrapper = (props:any) => {
    const {Component, context, onChange, ...other_props} = props
    const key = `${context.formGroupId!}Input`
    const _on_change = React.useCallback((new_value:any) => {
        context.setValue( (prev:any) => {
            const next = _.cloneDeep(prev)
            // next[props.name] = !prev[props.name]
            // nameのチェックを入れたい, Component作成時に初期値が必ずundefinedじゃないことを保証すればいい？
            if (onChange === undefined) {
                next[key][props.name] = new_value
            } else {
                next[key][props.name] = onChange(new_value, prev[key][props.name])
            }
            /* console.log(prev)
             * console.log(next) */
            return next
        })
    }, [context.setValue, context.formGroupId, props.name])
    // console.log(other_props)

    const _errors = React.useMemo(() => {
        if (context.errors == null) {
            return undefined
        }

        const e = context.errors.filter((x:any) => x.field == props.name).map(
            (x:any) => x.messages).reduce((a: string[], x: string []) => a.concat(x), [])

        if (e.length == 0) {
            return undefined
        }
        return e
    }, [context.errors])

    return <Component
               onChange={ _on_change }
               errors={_errors}
               {...other_props} />
}


const withFormContext = (Component: any, on_change: (((event:any, prev:any) => any) | undefined) = undefined) =>  ( (props: any) => {
    return <FormContext.Consumer>
      { (context) => {
            // console.log('wrapper -> ', props.name, context.value[props.name])
            return <ContextWrapper
                       Component={Component}
                       context={context!}
                       formId={ `${context!.formBaseId}-${context!.formGroupId!}-${props.name}` }
                       value={ context!.value[`${context!.formGroupId!}Input`][props.name] }
                       onChange={ on_change }
                       { ...props } />
      }}
    </FormContext.Consumer>
})

export {
    Props,
}
export default withFormContext
