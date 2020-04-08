import * as React from 'react'

import { graphql } from 'relay-runtime'
import { withEnvironment, SubscriptionRenderer } from '../gql-utils'


const CountSeconds = () => {
    return (
        <SubscriptionRenderer
        subscription={graphql`
            subscription countSeconds_Subscription {
                countSeconds(upTo: 5)
            }
        `}
        variables={ {} }
        >
        {
            (value: any) => <h2>{ value == null ? "no value" : value!.countSeconds }</h2>
        }
        </SubscriptionRenderer>
    )
}


export default withEnvironment(CountSeconds)
