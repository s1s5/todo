import { IEnvironment, Observer, Variables, GraphQLSubscriptionConfig } from 'relay-runtime'
import { graphql, requestSubscription } from 'react-relay'

import createSubscription from '../environment/create-subscription'

type Data = {
    
}

const request_subscription = (environment:IEnvironment, observer: Observer<Data>, variables: Variables | undefined) => {
    const subscriptionConfig : GraphQLSubscriptionConfig<Data> = {
        subscription: graphql`
            subscription todolistSubsc_Subscription { #($id: ID!) {
                # todoCreated(parentId: $id) {
                #     id
                #     completed
                #     text
                # }
                countSeconds(upTo:10)
            }
        `,
        variables: {},
        onNext: (data:Data | null | undefined) => (data && observer.next && observer.next(data)),
        onError: (error:Error) => (observer.error && observer.error(error)),
        onCompleted: () => (observer.complete && observer.complete()),
    }

    if (variables !== undefined) {
        // subscriptionConfig["variables"] = variables
    }
    
    const {dispose} = requestSubscription(
        environment,
        subscriptionConfig
    )

    const subsc = {unsubscribe: dispose, closed: false}
    observer.start && observer.start(subsc) 
    return () => {
        observer.unsubscribe && observer.unsubscribe(subsc)
        dispose()
    }    
}

export default createSubscription(request_subscription)
