import * as React from 'react'

import { graphql } from 'relay-runtime'
import SubscriptionRenderer from '../environment/subscription-renderer'


const Subsc = (props: {observer:any}) => React.useMemo( () => (
        <SubscriptionRenderer
            subscription={graphql`
                subscription countSeconds_Subscription {
                    countSeconds(upTo: 5)
                }
                `}
            variables={ {} }
            observer={ props.observer }
        >
          {
              (value: any) => <h2>{ value!.countSeconds }</h2>
          }
        </SubscriptionRenderer>
    ), [props.observer])


const MessageViewer = (props: {messages: string[]}) => (
    <ul>
      { props.messages.map((e, i) => <li key={ i }>{ e }</li>) }
    </ul>
)


const CountSeconds = () => {
    const [messages, set_messages] = React.useState<string[]>([])

    const observer = React.useMemo( () => ({
        next: (data: any) => {
            console.log("next:", data)
            set_messages(prev => prev.concat([' next => ' + data.countSeconds]))
        },
        error: (errors: any) => {
            console.log("error:", errors)
        },
        complete: () => {
            console.log("completed!!")
            set_messages(prev => prev.concat(['completed !!!']))
        }
    }), [set_messages])

    return (
        <>
        <Subsc observer={ observer }/>
        <MessageViewer messages={ messages }/>
        </>
    )
}


export default CountSeconds
