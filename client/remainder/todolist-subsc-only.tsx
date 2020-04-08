import * as React from 'react'
import {Environment} from 'relay-runtime'

/* import TodoSubsc from './todo-subsc'*/
import TodoSubsc from './todo-subsc-2'
// import {todoSubsc_data as TodoSubscData} from './__generated__/todoSubsc_data.graphql'

import {withEnvironment} from '../gql-utils'
import {useIdFromParam} from './utils'


type Props = {
    id?: string,
    environment: Environment,
}

const TodoListSubscOnly = (props: Props) => {
    const id = useIdFromParam(props.id)
    const [show_subsc, set_show_subsc] = React.useState(false)
    const observer1 = {
        next: (data: any) => {
            console.log('next1', data)
        },
        error: (error:Error) => console.log('error1', error),
        complete: () => console.log("completed!!!"),
    }
    return (
        <div>
          <p>subsc...</p>
          { show_subsc && 
            // <TodoSubsc variables={ {id: props.id} } observer={ observer1 } />
            <TodoSubsc id={ id } observer={ observer1 } />
          }
          <button onClick={ () => set_show_subsc(!show_subsc) }>{ show_subsc ? "hide" : "show" }</button>
        </div>
    )
}

export default withEnvironment(TodoListSubscOnly)
