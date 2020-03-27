import * as React from 'react'

import { Environment, UploadableMap } from 'relay-runtime'
import { graphql, commitMutation } from 'react-relay'

import { withEnvironment } from '../environment'


type Props = {
    environment: Environment,
}

const single_file_upload_mutation = graphql`
    mutation singleFileUpload_Mutation($input: SingleFileUploadFormMutationInput!) {
        singleFileUpload(input: $input) {
#         xx0: singleFileUpload(input: $input) {
            errors {
                field
                messages
            }
            success
        }
#        xx1: singleFileUpload(input: $input) {
#            errors {
#                field
#                messages
#            }
#            success
#        }
    }
`

const SingleFileUpload = (props: Props) => {
    const [file, set_file] = React.useState<File | Blob | null>(null)
    
    const commit = () => {
        commitMutation(
            props.environment,
            {
                mutation: single_file_upload_mutation,
                variables: {
                    input: {
                        file: 'a.txt',
                    },
                },
                onCompleted: (response: any, errors: any) => {
                    console.log('onCompleted!!!, repsonse = ', response)
                    console.log('onCompleted!!!, errors = ', response)
                },
                onError: (error: any) => {
                    console.log('onError!!!', error)
                },
                uploadables: {
                    "singleFileUpload-file[0]": file!,
                },
            }
        )
    }
    // multiple={ true }
    return (
        <div>
          <input id="file-data" type="file" onChange={ (e) => e.target.files && set_file(e.target.files.item(0)) } />
          <button onClick={ () => commit() }>upload file</button>
        </div>
    )
}

export default withEnvironment(SingleFileUpload)
