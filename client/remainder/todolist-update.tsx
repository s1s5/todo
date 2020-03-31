import * as React from 'react'

import { Environment } from 'relay-runtime'
import {withEnvironment} from '../environment'

import {graphql, commitMutation} from 'react-relay'

type Props = {
    id: string,
    environment: Environment
    children: (commit: () => void) => React.ReactNode,
}


const TodoListUpdate = (props: Props) => {
    const commit = React.useCallback(() => {
        commitMutation(
            props.environment,
            {
                mutation: graphql`
                    mutation todolistUpdate_Mutation($input: TodoListUpdateMutationInput!) {
                        todolistUpdate(input: $input) {
                            node {
                                id
                                title
                                author {
                                    id
                                    username
                                }
                            }
                        }
                    }
                `,
                variables: {
                    input: {
                        id: props.id,
                        title: "hello todolist - updated",
                    },
                },
                onCompleted: (response: any, errors: any) => {
                    console.log(response)
                    console.log('delete on complete', props)
                },
                onError: (error: any) => {
                    console.log('onError : ', error)
                },
                configs: [
                ],
            }
        )
    }, [props.environment])
    return <>{
        props.children(commit)
    }</>
}

export default withEnvironment(TodoListUpdate)
