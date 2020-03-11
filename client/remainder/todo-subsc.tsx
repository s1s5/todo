import * as React from 'react'
import { IEnvironment } from 'relay-runtime'
import { graphql, requestSubscription } from 'react-relay'
import { createSubscription } from "create-subscription";

const request_subscription = (id:string, environment:IEnvironment) => {
    const subscriptionConfig = {
        subscription: graphql`
            subscription todoSubsc_Subscription($id: ID!) {
                # 一個しか無理？
                # todoCreated(parentId: $id) {
                #     id
                #     completed
                #     text
                # }
                # todoUpdated(parentId: $id) {
                #     id
                #     completed
                #     text
                # }
                todolistMutation(id: $id) {
                    operation
                    todolist {
                        id
                        title
                    }
                    todo {
                        id
                        completed
                        text
                    }
                }
            }
        `,
        variables: {id: id},
        /* updater: (data:any) => {
         *     console.log(data)
         * },*/
        // updater?: SelectorStoreUpdater<TSubscriptionPayload>
        // updaterとonNextどっちも呼ばれる
        updater: (data:any) => console.log("updater@request_hello_subscription", data),
        onNext: (data:any) => console.log("onNext@request_hello_subscription", data),
        onError: (error:any) => console.log(`An error occured:`, error),
        onComplete: () => console.log("subscriptionc completed ! @request_hello_subscription"),
    }
    console.log(subscriptionConfig)
    return requestSubscription(
        environment,
        subscriptionConfig
    )
}

export default createSubscription<{environment: IEnvironment, id:string}, any>({
    getCurrentValue: (_: any) => undefined,
    subscribe: (source: any, callback:any) => {
        const {dispose} = request_subscription(source.id, source.environment)
        return dispose
    }
})
