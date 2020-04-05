import * as React from 'react'

import { graphql, Observer } from 'relay-runtime'
import SubscriptionRenderer from '../environment/subscription-renderer'

type Props = {
    id: string,
    observer: Observer<any>,
}

const Subsc = (props: Props) => {
    return <SubscriptionRenderer
               subscription={graphql`
            subscription todoSubsc2_Subscription($id: ID!) {
                # todoCreated(parentId: $id) {
                #     id
                #     completed
                #     text
                # }
                todoUpdated(parentId: $id) {
                    id
                    completed
                    text
                }

            }
               `}
    variables={ {id: props.id} }
    observer={ props.observer }
    />
}

export default Subsc

