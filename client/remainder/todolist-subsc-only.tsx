import * as React from 'react'
import {Environment} from 'relay-runtime'

import TodoSubsc from './todo-subsc'
import {todoSubsc_data as TodoSubscData} from './__generated__/todoSubsc_data.graphql'

import {withEnvironment} from '../environment'

type Props = {
    id: string,
    environment: Environment,
}

const TodoListSubscOnly = (props: Props) => {
    const [show_subsc, set_show_subsc] = React.useState(false)
    const observer1 = {
        next: (data:TodoSubscData) => {
            console.log('next1', data)
            
        },
        error: (error:Error) => console.log('error1', error),
        complete: () => console.log("completed!!!"),
    }
    return (
        <div>
          <p>subsc...</p>
          { show_subsc && 
            <TodoSubsc variables={ {id: props.id} } observer={ observer1 } />
          }
          <button onClick={ () => set_show_subsc(!show_subsc) }>{ show_subsc ? "hide" : "show" }</button>
        </div>
    )
}

export default withEnvironment(TodoListSubscOnly)