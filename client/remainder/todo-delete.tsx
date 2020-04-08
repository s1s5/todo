import * as React from 'react'

import { Environment } from 'relay-runtime'
import {graphql, commitMutation} from 'react-relay'
import {withEnvironment} from '../gql-utils'

type Props = {
    parent_id: string,
    id: string,
    environment: Environment
    children: (commit: () => void) => React.ReactNode,
}

const TodoDelete = (props: Props) => {
    /* console.log("todo delete ", props) */
    const commit = React.useCallback(() => {
        commitMutation(
            props.environment,
            {
                mutation: graphql`
                    mutation todoDelete_Mutation($input: TodoDeleteMutationInput!) {
                        todoDelete(input: $input) {
                            deletedTodoId
                        }
                    }
                `,
                variables: {
                    input: {id: props.id},
                },
                onCompleted: (response: any, errors: any) => {
                    console.log(response)
                    console.log('delete on complete', props)
                },
                configs: [
                    {
                        type: 'NODE_DELETE',
                        deletedIDFieldName: 'id',
                    },
                    {
                        type: 'RANGE_DELETE',
                        // parentName: 'todolist',
                        parentID: props.parent_id,
                        connectionKeys: [{
                            key: 'todolist_todoSet',
                            filters: {'orderBy': '-created_at'},
                        }, ],
                        pathToConnection: [props.parent_id, 'todoSet'],
                        deletedIDFieldName: 'deletedTodoId',
                    },
                ]
                ,
            }
        )
    }, [props.id, props.environment])
    return <>{
        props.children(commit)
    }</>
}

export default withEnvironment(TodoDelete)
