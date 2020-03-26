import * as React from 'react'

import FormContext from './form-context'

type Props<T> = {
    onSuccess?: (response: T) => unknown,
    onFailure?: (response: T) => unknown,
    children: (commit: () => void) => JSX.Element
}

const CommitTrigger = <T extends Object>(props: Props<T>) => {
    return <FormContext.Consumer>
      { (context) => (
          props.children(() => context!.commit(props.onSuccess, props.onFailure))
      )}
    </FormContext.Consumer>
}

export default CommitTrigger
