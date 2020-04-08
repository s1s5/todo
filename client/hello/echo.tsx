import * as React from 'react'

import { graphql, Observer, commitMutation } from 'relay-runtime'
import { withEnvironment, SubscriptionRenderer } from '../gql-utils'

const EchoForm_ = (props: any) => {
    const [message, set_message] = React.useState('')

    const commit = React.useCallback(() => {
        commitMutation(
            props.environment,
            {
                mutation: graphql`
                    mutation echo_Mutation($message: String!) {
                        doEcho(message: $message)
                    }
                `,
                variables: {
                    message,
                },
                onCompleted: (response: any, errors: any) => {
                    console.log(response, errors)
                },
                onError: (error: any) => {
                    console.log('onError : ', error)
                },
                configs: [
                ],
            }
        )
    }, [message])

    return (
        <>
        <input type="text" value={ message } onChange={ (event) => set_message(event.target.value) }/>
        <button onClick={ commit }>commit</button>
        </>
    )
}
const EchoForm = withEnvironment(EchoForm_)

const Subsc = (props: {observer: Observer<any>}) => {
    return <SubscriptionRenderer
               subscription={graphql`
                   subscription echo_Subscription {
                       echo
                   }
                   `}
               variables={ {} }
               observer={ props.observer }
    />
}


const Echo = () => {
    const [messages, set_messages] = React.useState<string[]>([])

    const observer = {
        next: (data: {echo: string}) => {
            console.log("next:", data)
            set_messages(prev => prev.concat([data.echo]))
        },
        error: (errors: any) => {
            console.log("error:", errors)
        },
    }
    return (
        <>
        <EchoForm/>
        <Subsc observer={ observer }/>
        <ul>
          { messages.map((e, i) => <li key={ i }>{ e }</li>) }
        </ul>
        </>
    )
}

export default Echo
