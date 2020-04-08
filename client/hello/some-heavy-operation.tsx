import * as React from 'react'

import { graphql, } from 'relay-runtime'
import { withEnvironment, useSubscription } from '../gql-utils'

import {someHeavyOperation_Subscription as SubscriptionType} from './__generated__/someHeavyOperation_Subscription.graphql'


const MessageViewer = (props: {messages: string[]}) => (
    <ul>
      { props.messages.map((e, i) => <li key={ i }>{ e }</li>) }
    </ul>
)

const SomeHeavyOperation = (props: any) => {
    const [messages, set_messages] = React.useState<string[]>([])

    const observer = React.useMemo( () => ({
        start: () => {
            set_messages([])
        },
        next: (data: any) => {
            console.log("next:", data)
            set_messages(prev => prev.concat([' next => ' + data.someHeavyOperation]))
        },
        error: (errors: any) => {
            console.log("error:", errors)
        },
        complete: () => {
            console.log("completed!!")
            set_messages(prev => prev.concat(['completed !!!']))
        }
    }), [set_messages])

    const value = useSubscription<SubscriptionType>({
        subscription: graphql`
            subscription someHeavyOperation_Subscription {
                someHeavyOperation
            }
        `,
        observer: observer,
        environment: props.environment,
    }, [observer, props.environment])

    return (
        <>
        <h2>{ value ? value.someHeavyOperation : "no value" }</h2>
        <MessageViewer messages={ messages }/>
        </>
    )
}


export default withEnvironment(SomeHeavyOperation)
