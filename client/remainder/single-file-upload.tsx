import * as React from 'react'

import { Environment, UploadableMap } from 'relay-runtime'
import { graphql, commitMutation } from 'react-relay'

import {
    FormControl,
    FormHelperText,
    InputLabel,
    Checkbox,
    Input,
    Button,
    FormControlLabel,
} from '@material-ui/core'


import { withEnvironment } from '../gql-utils'


type Props = {
    environment: Environment,
}

const single_file_upload_mutation = graphql`
    mutation singleFileUpload_Mutation($singleFileUploadInput: SingleFileUploadFormMutationInput!) {
        singleFileUpload(input: $singleFileUploadInput) {
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

import {
    Form, FormGroup, withFormContext, FormProps, FormSubmit
} from '../gql-utils'



const InputFile_ = (props: FormProps<string>) => (
    <input id="file-data" type="file" onChange={ props.onUpload } multiple={ true } />
)
const InputFile = withFormContext(InputFile_)


const SingleFileUpload = (props: Props) => {
    const value = {
        singleFileUploadInput: {
            file: null,
        }
    }
    return (
        <Form id="hoge" initialVariables={ value } mutation={ single_file_upload_mutation }>
          <FormGroup name="singleFileUpload">
            <InputFile name="file" />
          </FormGroup>
          <FormSubmit>{ (submit) => (
              <Button onClick={ () => submit().then(
                      (data:any) => console.log("success", data)
              ).catch( (error) => console.log("error", error) )}
                  >commit</Button>
          )}</FormSubmit>
        </Form>
    )
    //    const [file, set_file] = React.useState<File | Blob | null>(null)
    //    
//    const commit = () => {
//        commitMutation(
//            props.environment,
//            {
//                mutation: single_file_upload_mutation,
//                variables: {
//                    input: {
//                        file: 'a.txt',
//                    },
//                },
//                onCompleted: (response: any, errors: any) => {
//                    console.log('onCompleted!!!, repsonse = ', response)
//                    console.log('onCompleted!!!, errors = ', response)
//                },
//                onError: (error: any) => {
//                    console.log('onError!!!', error)
//                },
//                uploadables: {
//                    "singleFileUpload-file[0]": file!,
//                },
//            }
//        )
//    }
//    // multiple={ true }
//    return (
//        <div>
//          <input id="file-data" type="file" onChange={ (e) => e.target.files && set_file(e.target.files.item(0)) } />
//          <button onClick={ () => commit() }>upload file</button>
//        </div>
//    )
}

export default withEnvironment(SingleFileUpload)
