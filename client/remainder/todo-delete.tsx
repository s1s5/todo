import * as React from 'react'

import { Environment } from 'relay-runtime'
import {graphql, commitMutation} from 'react-relay'
import {withEnvironment} from '../environment'

type Props = {
    id: string,
    environment: Environment
    children: (commit: () => void) => React.ReactNode,
}

const TodoDelete = (props: Props) => {
    const commit = React.useCallback(() => {
        commitMutation(
            props.environment,
            {
                mutation: graphql`
                    mutation todoDelete_Mutation($input: TodoDeleteMutationInput!) {
                        todoDelete(input: $input) {
                            id
                        }
                    }
                `,
                variables: {
                    input: {id: props.id},
                },
                configs: [{
                    type: 'NODE_DELETE',
                    deletedIDFieldName: 'id',
                }],
            }
        )
    }, [props.id, props.environment])
    return <>{
        props.children(commit)
    }</>
}

export default withEnvironment(TodoDelete)
