import * as React from 'react'

import FormContext from './form-context'

type Props = {
    children: (commit: any) => JSX.Element
}

const CommitTrigger = (props: Props) => (
    <FormContext.Consumer>
      { (context) => (
          props.children(context!.commit)
      )}
    </FormContext.Consumer>
)

export default CommitTrigger
