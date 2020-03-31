import * as React from 'react'

import { Environment } from 'relay-runtime'
import {withEnvironment} from '../environment'

import {graphql, commitMutation} from 'react-relay'

type Props = {
    environment: Environment
    children: (commit: () => void) => React.ReactNode,
}


const TodoListAdd = (props: Props) => {
    const commit = React.useCallback(() => {
        commitMutation(
            props.environment,
            {
                mutation: graphql`
                    mutation todolistAdd_Mutation($input: TodoListCreateMutationInput!) {
                        todolistCreate(input: $input) {
                            edge {
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
                    }
                `,
                variables: {
                    input: {title: "hello todolist"},
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

export default withEnvironment(TodoListAdd)
